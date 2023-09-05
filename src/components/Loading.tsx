import components from './components.module.scss'

const Loading = () => {
  return (
    <div className={components.LoadingBody}>
      <div>
        <div className={components.TitleComponents}>
          <p className={components.blue}>Predict</p>
          <p>crowd</p>
          <p>accidents</p>
          <p>in</p>
          <p className={components.blue}>advance!</p>
        </div>
        <div className={components.IconComponents} />
      </div>
    </div>
  )
}

export default Loading;