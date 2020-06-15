import React, { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import Modal from 'components/Modal'
import PageSection from 'components/PageSection'
import CreationForm, { TModalForm } from './components/CreationForm'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const AdminPage: FC<TProps> = () => {
  const { admin } = useStore()
  const [modal, setModal] = useState<TModalForm>(null)

  useEffect(() => {
    admin.requestInfo()
  }, [])

  const onAddClick = useCallback(
    (form: TModalForm) => () => {
      setModal(form)
    },
    [setModal]
  )

  const onCloseModalClick = useCallback(() => {
    setModal(null)
  }, [setModal])

  return (
    <PageSection title="admin">
      {!!admin.info && (
        <>
          {!!admin.info.teachers.length && (
            <S.ContentTable
              columns={[
                { name: 'Ф.И.О.', property: 'name' },
                { name: 'Email', property: 'email' }
              ]}
              content={admin.info.teachers}
              title="Преподаватели"
              onAddClick={onAddClick({
                properties: ['email', 'password', 'name'],
                onSubmitClick: admin.postTeacher
              })}
            />
          )}
          {!!admin.info.students.length && (
            <S.ContentTable
              columns={[
                { name: 'Ф.И.О.', property: 'name' },
                { name: 'Email', property: 'email' },
                { name: 'Номер группы', property: 'group_number' }
              ]}
              content={admin.info.students}
              title="Студенты"
            />
          )}
          {!!admin.info.subjects.length && (
            <S.ContentTable
              columns={[{ name: 'Название предмета', property: 'name' }]}
              content={admin.info.subjects}
              title="Предметы"
              onAddClick={onAddClick({
                properties: ['name'],
                onSubmitClick: admin.postSubject
              })}
            />
          )}
          {!!admin.info.groups.length && (
            <S.ContentTable
              columns={[{ name: 'Номер группы', property: 'number' }]}
              content={admin.info.groups}
              title="Группы"
              onAddClick={onAddClick({
                properties: ['number'],
                onSubmitClick: admin.postGroup
              })}
            />
          )}
          {!!modal && (
            <Modal onCloseClick={onCloseModalClick}>
              <CreationForm {...modal} onClose={onCloseModalClick} />
            </Modal>
          )}
        </>
      )}
    </PageSection>
  )
}

export default compose(hot, observer)(AdminPage)
