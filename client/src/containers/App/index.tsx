import React from 'react'

type TOuterProps = {
    count: number
}
type TProps = TOuterProps

const App = ({ count }: TProps) => <p>Test {count}</p>

export default App