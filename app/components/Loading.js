import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {

    state = {
        progress: ''
    }
    
    static defaultProps = {
        text: "Loading"
    }

    static propTypes = {
        text: PropTypes.string
    }

    componentDidMount(){
        let intervalID = setInterval(() => {
            console.log(this.state.progress)
            this.setState((state) => {
              return {
                progress: state.progress !== '...' ? `${state.progress}.` : ''
              }  
            })
        }, 300)
        this.setState({ intervalId: intervalID })
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId)
    }

    render() {
        const loadingText = this.props.text
        const {progress} = this.state
        return(
         
                <h1 className="loader">
                    {`${loadingText}${progress}`}
                </h1>

            
        )
    }
}
