import {h} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import * as Sounds from '../sounds'
import * as Type from '../types'
import './index.scss'

const data = [
  {
    title: 'Сигналы манёвроуказания и предупреждения для судов, находящихся на виду друг у друга',
    sounds: [
      {id: 1, sound: Sounds.changeCourseRight, text: 'Я изменяю свой курс вправо'},
      {id: 2, sound: Sounds.changeCourseLeft, text: 'Я изменяю свой курс влево'},
      {id: 3, sound: Sounds.motorsWorkingReverse, text: 'Мои движетали работают на задний ход'},
      {id: 4, sound: Sounds.no, text: 'Нет, не согласен, не понимаю ваших намерений'}
    ]
  },
  {
    title: 'Сигналы для судов в условиях ограниченной видимости',
    sounds: [
      {id: 1, sound: Sounds.motorBoatUnderwayHavingSpeedOverWater, text: 'Моторное судно на ходу, имеющее ход относительно воды'},
      {id: 2, sound: Sounds.motorBoatUnderwayNoHavingSpeedOverWater, text: 'Моторное судно на ходу, не имеющее ход относительно воды'},
      {
        id: 3,
        sound: Sounds.limitedAbilityManeuver,
        text: 'Парусное судно, руболовное судно, судно, стеснённое своей осадкой, ограниченное в возможности маневрировать, лишенное возможности управлять, буксир'
      },
      {id: 4, sound: Sounds.lastVesselTowed, text: 'Последнее буксируемое судно'},
      {id: 5, sound: Sounds.pilotShipOnDuty, text: 'Лоцманское судно при исполнении своих обязанностей'},
      {id: 6, sound: Sounds.collisionWarningFromVesselAtAnchor, text: 'Предупреждение о возможности столкновения от судна на якоре'},
      {id: 7, sound: Sounds.vessel100MAtAnchor, text: 'Судно длиной до 100 м на якоре'},
      {id: 8, sound: Sounds.vessel100MOverAnchor, text: 'Судно длиной свыше 100 м на якоре'},
      {id: 9, sound: Sounds.vessel100MAtAground, text: 'Судно длиной до 100 м на мели'},
      {id: 10, sound: Sounds.vessel100MOverAground, text: 'Судно длиной свыше 100 м на мели'}
    ]
  },
  {
    title: 'Дополнительные сигналы',
    sounds: [
      {id: 1, sound: Sounds.mow, text: 'Селовек за бортом - МОВ'},
      {id: 2, sound: Sounds.youHeadingDanger, text: 'Вы движетесь навстречу опасности'},
      {id: 3, sound: Sounds.sos, text: 'Сигнал бедствия - SOS'}
    ]
  }
]

export const SoundSignals: Type.F<any> = () => {
  const [lastAudio, setLastAudio] = useState(null)
  const [newAudio, setNewAudio] = useState(null)

  const currentPlaySound = () => {
    const lastAudioPauseAndPlayNewAudio = () => {
      newAudio.play()
      lastAudio.pause()
      lastAudio.currentTime = 0
    }
    newAudio ? lastAudioPauseAndPlayNewAudio() : lastAudio?.play()
  }

  useEffect(() => {
    currentPlaySound()
  }, [lastAudio, newAudio])

  return <div class='sound-signals'>
    {data.map(({title, sounds}) =>
      <div>
        <h3 class='title pt-3'>{title}</h3>
        {sounds.map(({id, sound, text}) =>
          <Audio key={id + text} sound={sound} text={text} lastAudio={lastAudio}
                 newAudio={newAudio} onLastAudio={setLastAudio}
                 onNewAudio={setNewAudio}/>
        )}
      </div>
    )}
  </div>
}

type AudioProps = {
  sound: string
  text: string
  lastAudio: any
  newAudio: any
  onLastAudio: (audio: any) => void
  onNewAudio: (audio: any) => void
}

const Audio: Type.F<AudioProps> = ({sound, text, lastAudio, newAudio, onLastAudio, onNewAudio}) => {
  const audio: any = useRef()

  const updateNewAudio = () => {
    newAudio && onLastAudio(newAudio)
    onNewAudio(audio.current)
  }

  const onClick = () => {
    lastAudio ? updateNewAudio() : onLastAudio(audio.current)
  }
  return (
    <div class='audio flex-align-center' onClick={onClick}>
      <audio ref={audio}>
        <source src={sound} type='audio/mp3'/>
        Обновите браузер!
      </audio>
      <p>
        {text}
      </p>
    </div>
  )
}