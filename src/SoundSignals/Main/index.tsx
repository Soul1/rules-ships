import {h} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import * as Sounds from '../sounds'
import * as Images from '../images'
import * as Type from '../types'
import './index.scss'

const data = [
  {
    title: 'Сигналы манёвроуказания и предупреждения для судов, находящихся на виду друг у друга',
    sounds: [
      {id: 1, sound: Sounds.changeCourseRight, text: 'Я изменяю свой курс вправо', morseCode: ['.']},
      {id: 2, sound: Sounds.changeCourseLeft, text: 'Я изменяю свой курс влево', morseCode: ['.', '.']},
      {id: 3, sound: Sounds.motorsWorkingReverse, text: 'Мои движетали работают на задний ход', morseCode: ['.', '.', '.']},
      {id: 4, sound: Sounds.no, text: 'Нет, не согласен, не понимаю ваших намерений', morseCode: ['.', '.', '.', '.', '.']},
      {id: 5, sound: Sounds.overtakeYouStarboardSide, text: 'Я намереваюсь обогнать вас по вашему правому борту', morseCode: ['-', '-', '.']},
      {id: 6, sound: Sounds.overtakeYouPortSide, text: 'Я намереваюсь обогнать вас по вашему левому борту', morseCode: ['-', '-', '.', '.']},
      {id: 7, sound: Sounds.yes, text: 'Да, согласен', morseCode: ['-', '.', '-', '.']},
      {id: 8, sound: Sounds.approachingBlindBend, text: 'Предупреждение о приближении к "слепому" изгибу', morseCode: ['-']},
      {id: 9, sound: Sounds.approachingBlindBend, text: 'Ответ на предупреждение о приближении к "слепому" изгибу', morseCode: ['-']},
    ]
  },
  {
    title: 'Сигналы для судов в условиях ограниченной видимости',
    sounds: [
      {id: 1, sound: Sounds.motorBoatUnderwayHavingSpeedOverWater, text: 'Моторное судно на ходу, имеющее ход относительно воды', morseCode: ['-']},
      {id: 2, sound: Sounds.motorBoatUnderwayNoHavingSpeedOverWater, text: 'Моторное судно на ходу, не имеющее ход относительно воды', morseCode: ['-', '-']},
      {id: 3, sound: Sounds.limitedAbilityManeuver, text: 'Парусное судно, руболовное судно, судно, стеснённое своей осадкой, ограниченное в возможности маневрировать, лишенное возможности управлять, буксир', morseCode: ['-', '.', '.']},
      {id: 4, sound: Sounds.lastVesselTowed, text: 'Последнее буксируемое судно', morseCode: ['-', '.', '.', '.']},
      {id: 5, sound: Sounds.pilotShipOnDuty, text: 'Лоцманское судно при исполнении своих обязанностей', morseCode: ['.', '.', '.', '.']},
      {id: 6, sound: Sounds.collisionWarningFromVesselAtAnchor, text: 'Предупреждение о возможности столкновения от судна на якоре', morseCode: ['.', '-', '.']},
      {id: 7, sound: Sounds.vessel100MAtAnchor, text: 'Судно длиной до 100 м на якоре', img: Images.vessel100MAtAnchor},
      {id: 8, sound: Sounds.vessel100MOverAnchor, text: 'Судно длиной свыше 100 м на якоре', img: Images.vessel100MOverAnchor},
      {id: 9, sound: Sounds.vessel100MAtAground, text: 'Судно длиной до 100 м на мели', img: Images.vessel100MAtAground},
      {id: 10, sound: Sounds.vessel100MOverAground, text: 'Судно длиной свыше 100 м на мели', img: Images.vessel100MOverAground}
    ]
  },
  {
    title: 'Дополнительные сигналы',
    sounds: [
      {id: 1, sound: Sounds.mow, text: 'Селовек за бортом - МОВ', morseCode: ['-', '-', '-']},
      {id: 2, sound: Sounds.youHeadingDanger, text: 'Вы движетесь навстречу опасности', morseCode: ['.', '.', '-']},
      {id: 3, sound: Sounds.sos, text: 'Сигнал бедствия - SOS', morseCode: ['.', '.', '.', '-', '-', '-', '.', '.', '.']}
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
        {sounds.map(({id, sound, text, img, morseCode}) =>
          <Audio key={id + text} sound={sound} text={text} img={img} morseCode={morseCode}
                 lastAudio={lastAudio}
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
  img: string
  morseCode: string[]
  lastAudio: any
  newAudio: any
  onLastAudio: (audio: any) => void
  onNewAudio: (audio: any) => void
}

const Audio: Type.F<AudioProps> = ({sound, text, img, morseCode, lastAudio, newAudio, onLastAudio, onNewAudio}) => {
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
      <div style={{fontSize: 0}}>
        { morseCode ?
          morseCode?.map(m => m === '.' ? <Circle/> : <Hyphen/>)
          : <img src={img} alt='icon'/>
        }
      </div>
      <div>
        <audio ref={audio}>
        <source src={sound} type='audio/mp3'/>
        Обновите браузер!
      </audio>
        <p>
          {text}
        </p>
      </div>
    </div>
  )
}

const Circle = () => <span style={{border: '1px solid #000', borderRadius: '100%', backgroundColor: '#000', margin: '0 10px', padding: '3px'}}/>
const Hyphen = () => <span style={{border: '2px solid #000', margin: '0 10px', padding: '0 8px'}}/>
