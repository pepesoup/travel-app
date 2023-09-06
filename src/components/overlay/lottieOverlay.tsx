import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
//import Text from '@app/components/common/text'
import { Text } from 'react-native-paper'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import LottieView from 'lottie-react-native'
import _ from 'lodash'
import { newScoreState, runAnimationState } from './lottieOverlayState'

type AnimationSource = {
    src: object
    text: string
    speed: number
    timeout: number
}
type AnimationSources = {
    [key: string]: AnimationSource
}

export const animationSources: AnimationSources = {
    '123go': {
        src: require('./assets/92464-321-go.json'),
        text: '',
        speed: 1,
        timeout: 4000,
    },
}

const scoreAnimations: AnimationSource[] = [
    {
        src: require('./assets/83563-confetti-lottie-animation.json'),
        text: 'Youre a Star!',
        speed: 1,
        timeout: 3000,
    },
    {
        src: require('./assets/74694-confetti.json'),
        text: 'Good job!',
        speed: 1,
        timeout: 3000,
    },
    {
        src: require('./assets/q3XsnMBFcg.json'),
        text: 'Good job!',
        speed: 1,
        timeout: 3000,
    },
]

const LottieOverlay = () => {
    //return null
    const animation: any = useRef(null)
    const [zIndex, setZindex] = useState(0)
    const [newScore, setNewScore]: [any, any] = useRecoilState(newScoreState)
    const [runAnimation, setRunAnimation]: [AnimationSource, any] =
        useRecoilState(runAnimationState)
    const [animationSource, setAnimationSource]: [AnimationSource | null, any] = useState(null)
    const [actionText, setActionText] = useState('')

    const runAnimationCallback = useCallback(
        (source: AnimationSource) => {
            setZindex(100)
            setAnimationSource(source)

            setTimeout(() => {
                animation.current?.play()
            }, 100)
            setTimeout(() => {
                setZindex(0)
                animation.current?.reset()
                setNewScore(null)
            }, source.timeout)
        },
        [setNewScore]
    )

    /* when user have collected a score */
    useEffect(() => {
        if (newScore) {
            runAnimationCallback(_.sample(scoreAnimations) as AnimationSource)
            setActionText(`${newScore.score} points`)
            setNewScore(null)
        }
    }, [newScore, runAnimationCallback, setNewScore])

    /* when animation source is set */
    useEffect(() => {
        if (runAnimation) {
            runAnimationCallback(runAnimation)
            setActionText('')
            setRunAnimation(null)
        }
    }, [runAnimation, runAnimationCallback, setRunAnimation])

    if (animationSource === null) {
        return null
    }

    if (zIndex === 0) {
        return null
    }

    const lottie = () => (
        <LottieView
            ref={animation}
            speed={(animationSource as AnimationSource)?.speed}
            style={{
                flex: 1,
                backgroundColor: 'transparent',
            }}
            source={animationSource?.src}
            onAnimationFinish={() => {
                setZindex(0)
            }}
            loop={false}
        />
    )
    return (
        <View
            style={{
                backgroundColor: 'rgba(0,0,0,.5)',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                ...StyleSheet.absoluteFillObject,
                zIndex,
            }}
            pointerEvents={'box-none'}
        >
            {lottie()}
            <Text variant="titleLarge">{(animationSource as AnimationSource)?.text}</Text>
            <Text variant="titleLarge">{actionText}</Text>
        </View>
    )
}

export default LottieOverlay
