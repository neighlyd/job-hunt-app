import React from 'react'
import { slide as Menu } from 'react-burger-menu'

import MomentumScore from './MomentumScore'
import ResiliencyScore from './ResiliencyScore'

const ScoresPage = () => {
    return (
        <Menu>
           <MomentumScore/>
           <ResiliencyScore/>
        </Menu>
    )
}
export default ScoresPage