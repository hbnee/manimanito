import { useEffect, useRef, useState } from 'react';
import './App.css';
import { message } from 'antd'
import { dateRegexp, getRandomTarget, Users } from './ConstantValues';
import ManitoOpen from './ManitoOpen';
import { SHA256 } from 'crypto-js';

function App() {
  const [inputName, setInputName] = useState('')
  const [dateCheck, setDateCheck] = useState(false)
  const [inputDate, setInputDate] = useState('')
  const [nameIsOk, setNameIsOk] = useState(false)
  const [codeCheck, setCodeCheck] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [answers, setAnswers] = useState([])
  const timerRef = useRef()

  useEffect(() => {
    let setHeightInit = () => {
      document.documentElement.style.setProperty("--doc-height", "".concat(window.innerHeight, "px"))
    }
    window.addEventListener('resize', setHeightInit)
    setHeightInit()
  }, [])

  useEffect(() => {
    if (dateCheck) {
      let userTemp = [...Users]
      let temp = []
      for (let i = 0; i < userTemp.length; i++) {
        const result = getRandomTarget(userTemp.filter(_ => _ !== userTemp[i] && !temp.includes(_)), userTemp[i], inputDate)
        temp.push(result)
      }
      setAnswers(temp)
    }
  }, [dateCheck])

  return (
    <div className="App">
      {
        dateCheck ? (
          nameIsOk ? (
            codeCheck ? <ManitoOpen targetName={inputName} answers={answers} /> : <form className='contents-container' onSubmit={e => {
              e.preventDefault()
              const code = SHA256(inputName).toString().toUpperCase().slice(0, 8)
              if(timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = undefined
              }
              if (inputCode === code) {
                setCodeCheck(true)
              } else {
                message.error("첩자가 입장하였습니다.")
                message.error("3초 뒤 자동으로 창이 닫힙니다.")
                setTimeout(() => {
                  message.error("2초 뒤 자동으로 창이 닫힙니다.")
                }, 1000);
                setTimeout(() => {
                  message.error("1초 뒤 자동으로 창이 닫힙니다.")
                }, 2000);
                timerRef.current = setTimeout(() => {
                  message.error("농담입니다. 코드를 정확히 입력해주세요.")
                }, 3000);
              }
            }}>
              <div>
                마지막 테스트가 있겠습니다.
              </div>
              <div>
                발급받은 코드를 입력해주세요.
              </div>
              <div>
                <input value={inputCode} onChange={e => {
                  setInputCode(e.target.value)
                }} maxLength={8} placeholder='코드 입력' autoFocus />
              </div>
              <div>
                <button className='name-question-submit-button' type="submit2">
                  복덕방 인증하기
                </button>
              </div>
            </form>
          ) : <form className='contents-container' onSubmit={e => {
            e.preventDefault()
            const target = Users.find(_ => _ === inputName)
            if (!inputName) {
              return message.error("이름을 입력해주세요.")
            } else if (/[a-zA-Z]/g.test(inputName)) {
              return message.error("한국인이 아닌가요?")
            } else if (!target) {
              return message.error("당신은 복덩방 멤버가 아닙니다.")
            }
            setNameIsOk(true)
          }}>
            <div className='question-text'>당신의 이름은 무엇입니까?</div>
            <div>
              <input value={inputName} onChange={e => {
                setInputName(e.target.value)
              }} autoFocus placeholder='이름 입력' />
            </div>
            <div>
              <button className='name-question-submit-button' type="submit2">
                나. 강림.
              </button>
            </div>
          </form>
        ) : <form className='contents-container' onSubmit={e => {
          e.preventDefault()
          if (!inputDate) {
            return message.error("날짜를 입력해주세요.")
          } else if (!/[0-9]/g.test(inputDate)) {
            setInputDate('')
            return message.error("저런... 숫자만 입력해주세요.")
          } else if (!dateRegexp.test(inputDate)) {
            setInputDate('')
            return message.error("대체 어느 시대에 살고 계신걸까요??")
          }
          setDateCheck(true)
        }}>
          <div className='question-text'>선물 할 날짜를 입력해주세요.</div>
          <div>
            <input value={inputDate} onChange={e => {
              setInputDate(e.target.value)
            }} autoFocus placeholder='YYYYMMDD' maxLength={8} />
          </div>
          <div>
            <button className='name-question-submit-button' type="submit2">
              다음 단계로
            </button>
          </div>
        </form>
      }
    </div>
  );
}

export default App;
