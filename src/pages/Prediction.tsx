import { useEffect, useState } from 'react'
import pd from './Prediction.module.scss'
import components from '../components/components.module.scss'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Type {
  setHeader: React.Dispatch<React.SetStateAction<string>>
}

const Prediction: React.FC<Type> = (props) => {
  const navigate = useNavigate()
  const [position, setPosition] = useState({ lat: 36.30317, lng: 128.58519 })
  const [total_people, setTotal_people] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    props.setHeader('위치 찾기')
  }, [])

  async function submit(e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (total_people === '' || isNaN(parseFloat(total_people))) return alert('Input Value Error')
    await axios('http://54.180.126.168:5001/', {
      method: 'POST',
      data: {
        latitude: position.lat.toFixed(5),
        longitude: position.lng.toFixed(5),
        total_people: parseInt(total_people)
      }
    }).then((res) => {
      navigate(`/res?accident_rate=${res.data.accident_rate}&predicted_victims=${res.data.predicted_victims}&total=${total_people}`)
    }).catch((err) => {
      console.error(err)
    })
  }

  function AddressToPosition(address: string) {
    axios(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
      headers: {
        Authorization: `KakaoAK c85b256a8511aef9b314fd0ca4d0c635`
      }
    })
      .then((res) => {
        setPosition({
          lat: res.data.documents.length >= 1 ? parseFloat(Number(res.data.documents[0].address.y).toFixed(5)) : 36.303172,
          lng: res.data.documents.length >= 1 ? parseFloat(Number(res.data.documents[0].address.x).toFixed(5)) : 128.5851977
        })
      }).catch((err) => {
        alert(err.response.data.message)
      })
  }

  return (
    <div className={pd.Body}>
      <Map // 지도를 표시할 Container
        className={components.Map}
        center={position}
        isPanto={true}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={5} // 지도의 확대 레벨
        onClick={(_t, e) => setPosition({
          lat: parseFloat(e.latLng.getLat().toFixed(5)),
          lng: parseFloat(e.latLng.getLng().toFixed(5))
        })}
      >
        <MapMarker
          position={position}
          draggable={true}
          opacity={0.9}
          onDragEnd={(e) => setPosition({
            lat: parseFloat(e.getPosition().getLat().toFixed(5)),
            lng: parseFloat(e.getPosition().getLng().toFixed(5))
          })}
        />
      </Map>
      <hr />
      <input disabled className={pd.Input} placeholder='lat' value={`lat: ${position.lat}`} />
      <input disabled className={pd.Input} placeholder='lng' value={`lng: ${position.lng}`} />
      <hr />
      <input className={pd.Input} placeholder='주소 검색' value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type='button' className={pd.InputButton} value={"주소 검색"} onClick={() => AddressToPosition(address)} />
      <hr />
      <form onSubmit={submit}>
        <input className={pd.Input} placeholder='인구수' value={total_people} onChange={(e) => setTotal_people(e.target.value)} />
        <hr />
        <input type='submit' className={pd.InputButton} value={"인파사고 위험도 예측"} onClick={submit} />
      </form>
    </div>
  )
}

export default Prediction;