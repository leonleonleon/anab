import React                from 'react';
import PropTypes            from 'prop-types';

/**
 *  Headline Component
 *
 */
export default class Headline extends React.Component {

    state = {
        showSource : false,
    }

    static propTypes = {
        title       : PropTypes.string,
        description : PropTypes.string,
        source      : PropTypes.string,
    }

    /**
     * handles button click
     * @param {event} [mouseEvent] blah blah blah
     */
    handleClick = ( mouseEvent ) => {

        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();

        const { showSource } = this.state;

        if ( showSource ) {
            this.setState(
                { showSource : false }
            );
        } else {
            this.setState(
                { showSource : true }
            );
        }
    }
    /**
     *  Headline Render
     *
     *  @return {JSX} headline element
     */
    render() {
        const { showSource } = this.state;
        const { title, source, description } = this.props;

        if ( showSource ) {
            // onClick={ this.handleClick.bind( this ) }
            return (
                <div
                    className="headline"
                >
                    { source }
                </div>
            );
        }

        return (
            <div
                className="headline"
            >
                { title }
                <span>{ description }</span>
            </div>
        );
    }
}
