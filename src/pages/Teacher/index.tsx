import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { withRoute } from 'react-router5'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import PageSection from 'components/PageSection'
import Route from 'components/Route'

type TOuterProps = SubscribeState & {}
type TProps = TOuterProps

const TeacherPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()

  useEffect(() => {
    teacher.getTeacherInfo()
  }, [])

  return (
    !!teacher.info && (
      <PageSection title={teacher.info.name}>
        <Route routeName={route.name} />
      </PageSection>
    )
  )
}

export default compose(hot, withRoute, observer)(TeacherPage)
