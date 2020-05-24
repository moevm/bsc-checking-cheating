import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { withRoute } from 'react-router5'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import Button from 'components/Button'
import PageSection from 'components/PageSection'
import Route from 'components/Route'
import SubjectsList from 'components/SubjectsList'

type TOuterProps = SubscribeState & {}
type TProps = TOuterProps

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  return <div>TASK</div>
}

export default compose(hot, withRoute, observer)(TeacherTaskPage)
