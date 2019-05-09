import React from 'react'

import MomentumScore from './MomentumScore'
import ResiliencyScore from './ResiliencyScore'

export class SideBar extends React.Component {
    constructor() {
        super()
        this.state = {
            width: window.innerWidth
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange)
    }

    handleWindowSizeChange = () => {
        this.setState({
            width: window.innerWidth
        })
    }
    
    render(){
        const { width } = this.state
        const isMobile = width <= 500;
        if(isMobile){
            return(
                null
            )
        } else {
            return(
                <div className='show-for-desktop'>
                    <div className='sidebar'>
                        <div>
                            <MomentumScore />
                        </div>
                        <div>
                            <ResiliencyScore />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SideBar