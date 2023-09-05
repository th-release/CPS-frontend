import PieChart from "@cloudscape-design/components/pie-chart";
import Box from "@cloudscape-design/components/box";
import rs from './Result.module.scss'
import { Type } from "../utils/interface";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result: React.FC<Type> = (props) => {
  const navigate = useNavigate();
  const location = useLocation()
  const serachParams = new URLSearchParams(location.search)

  useEffect(() => {
    props.setHeader('예측 결과')

    if (!serachParams.get('accident_rate') || !serachParams.get('predicted_victims') || !serachParams.get('total')) return navigate('/')
    if (isNaN(parseFloat(serachParams.get('accident_rate')!)) || isNaN(parseFloat(serachParams.get('predicted_victims')!)) || isNaN(parseFloat(serachParams.get('total')!)))
      return navigate('/')
  }, [])

  return (
    <div className={rs.Body}>
      <div className={rs.centerWhite} style={{ paddingTop: '20px' }}>
        <h3 style={{ fontSize: '18px', paddingTop: '20px' }}>인파사고 발생가능성이 높으면 수치 증가</h3>
        <h1 style={{ fontSize: '30px', paddingTop: '5px' }}>예측 결과</h1>
      </div>
      <div className="chart fontWhite">
        <PieChart
          className="fontWhite"
          data={[
            { title: "사고율", value: +serachParams.get('accident_rate')! },
            { title: "비 사고율", value: 100 - +serachParams.get('accident_rate')! }
          ]}
          segmentDescription={(datum, sum) =>
            `${datum.value} units, ${(
              (datum.value / sum) *
              100
            ).toFixed(0)}%`
          }
          ariaDescription="사고율 차트"
          ariaLabel="사고율 차트"
          hideDescriptions
          hideFilter
          hideLegend
          hideTitles
          innerMetricDescription="사고율"
          innerMetricValue={`${serachParams.get('accident_rate')!}%`}
          size="large"
          variant="donut"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data available</b>
              <Box variant="p" color="inherit">
                There is no data available
              </Box>
            </Box>
          }
          noMatch={
            <Box textAlign="center" color="inherit">
              <b>No matching data</b>
              <Box variant="p" color="inherit">
                There is no matching data to display
              </Box>
            </Box>
          }
        />
      </div>
      <div className={rs.centerWhite}>
        <h1 style={{ fontSize: '30px' }}>인파사고 발생 가능성</h1>
      </div>

      <div className={rs.descBox}>
        <h1>인구수: {serachParams.get('total')}명</h1>
        <h1>사상자: {serachParams.get('predicted_victims')}명</h1>
        <h1>전체 인구수 비례 사상자: {parseInt(serachParams.get('predicted_victims')!) / parseInt(serachParams.get('total')!) * 100}%</h1>
        <h1>사고율: {serachParams.get('accident_rate')!}%</h1>
      </div>
    </div>
  )
}

export default Result;