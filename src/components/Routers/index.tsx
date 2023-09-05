import { useState, type FC } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Loading from '../Loading'
import Header from '../Header'
import Prediction from '../../pages/Prediction'
import Result from '../../pages/Result'

const Routers: FC = () => {
  const [header, setHeader] = useState('로딩 중...');
  const location = useLocation()

  return (
    <>
      <Header name={header} />
      <Routes location={location} key={location.key}>
        <Route path='/' element={<Prediction setHeader={setHeader} />} />
        <Route path='/res' element={<Result setHeader={setHeader} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Loading />
    </>
  )
}

export default Routers
