import 'sass/App.scss';
import React                from 'react';
// import { API_URL }             from 'config/app.json';
import Game                 from './Game.jsx';

// const API_KEY = process.env.API_KEY;

/**
 *  App Component
 *
 */
export default class App extends React.Component {
    static propTypes = {
    };


    state = {
        game : false,
    };

    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount() {
    }

    /**
     * componentDidUpdate
     */
    componentWillUpdate() {
    }

    /**
     * componentDidUpdate
     */
    componentDidUpdate() {
    }

    /**
     *  App Render
     *
     *  @return {JSX} app element plus children
     */
    render() {

        const { game, sources } = this.state;

        if ( game ) {
            return (
                <Game
                    sources={ sources }
                />
            );
        }

        return (
            <div className="wrapper">
                <div className="logo">
                    <span>ALL NEWS ARE BAFFLED</span>
                </div>
                <div
                    className="replay"
                    onClick={ () => {
                        this.setState( {
                            game    : true,
                            sources : [
                                {
                                    id   : 'bild',
                                    name : 'Bild',
                                },
                                {
                                    id   : 'die-zeit',
                                    name : 'Die Zeit',
                                },
                                {
                                    id   : 'spiegel-online',
                                    name : 'Spiegel Online',
                                },
                            ],
                        } );
                    } }
                >
                    play Zeit vs Bild vs Spiegel Online
                </div>
                <div
                    className="replay"
                    onClick={ () => {
                        this.setState( {
                            game    : true,
                            sources : [
                                {
                                    id   : 'breitbart-news',
                                    name : 'Breitbart News',
                                },
                                {
                                    id   : 'the-new-york-times',
                                    name : 'New York Times',
                                },
                            ],
                        } );
                    } }
                >
                    play Times vs Breitbart
                </div>
                <div
                    className="replay"
                    onClick={ () => {
                        this.setState( {
                            game    : true,
                            sources : [
                                {
                                    id   : 'bbc-news',
                                    name : 'BBC',
                                },
                                {
                                    id   : 'al-jazeera-english',
                                    name : 'Al Jazeera',
                                },
                                {
                                    id   : 'breitbart-news',
                                    name : 'Breitbart News',
                                },
                                {
                                    id   : 'the-new-york-times',
                                    name : 'New York Times',
                                },
                                {
                                    id   : 'daily-mail',
                                    name : 'Daily Mail',
                                },
                            ],
                        } );
                    } }
                >
                    play a wild mix
                </div>
            </div>
        );
    }
}
