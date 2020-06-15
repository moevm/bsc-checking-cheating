import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import PageSection from 'components/PageSection'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const AdminPage: FC<TProps> = () => {
  return (
    <PageSection title="Админка">
      {/* <S.Link routeName="student">Студент</S.Link>
      <S.Link routeName="teacher">Преподаватель</S.Link> */}
    </PageSection>
  )
}

export default compose(hot, observer)(AdminPage)
