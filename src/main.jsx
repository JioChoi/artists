import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <h1 className="text-4xl/snug">예상보다 사용량이 너무 많아서 이러다가 프롬봇 서버까지 같이 닫는다는 경고가 와서 몇시간동안 (2시간 정도 예상...) 잠깐만 닫을게요<br/>이미지 서버 수정하고 바로 정상화 시킴</h1>
)
