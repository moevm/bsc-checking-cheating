import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { withRoute } from 'react-router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import Button from 'components/Button'
import PageSection from 'components/PageSection'
import Route from 'components/Route'
import SubjectsList from 'components/SubjectsList'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  return <div>{route.params.id}</div>
}

export default compose(hot, observer)(TeacherTaskPage)
