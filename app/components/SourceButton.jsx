import React                from 'react';
import PropTypes            from 'prop-types';

/**
 * SourceButton Component
 *
 * @param {Event} event
 */
export default class SourceButton extends React.Component {
    state = {
        showSource : false,
    }
    static propTypes = {
        source       : PropTypes.string,
        title        : PropTypes.string,
        current      : PropTypes.string,
        checkAnswer  : PropTypes.func,
    }
    /**
     * handleClick
     *
     * @param {Event} event
     */
    handleClick = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        const { current, source } = this.props;

        if ( current === source ) {
            this.props.checkAnswer( true );
        } else {
            this.props.checkAnswer( false );
        }
    }
    /**
     *  SourceButton Render
     *
     *  @return {JSX} SourceButton element
     */
    render() {
        // const { showSource } = this.state;
        const { title } = this.props;

        return (
            <div
                onClick={ this.handleClick.bind( this ) }
                className="button"
            >
                { title }
            </div>
        );
    }
}
