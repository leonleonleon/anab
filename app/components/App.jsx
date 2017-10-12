import 'sass/App.scss';
import React                from 'react';
import PropTypes            from 'prop-types';
import SourceButton               from './SourceButton.jsx';
import Headline               from './Headline.jsx';
import { API_URL, MAX_QUESTIONS, RESULT_LENGTH }             from 'config/app.json';
// import { API_KEY }             from 'config/apiKey.json';

const API_KEY = process.env.API_KEY;

/**
 *  App Component
 *
 */
export default class App extends React.Component {
    static propTypes = {
        children    : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.element ),
            PropTypes.element,
        ] ),
        params      : PropTypes.object,
        location    : PropTypes.object,
        history     : PropTypes.object,
    };


    state = {
        headlines    : [],
        loaded       : 0,
        sources      : [
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
        current      : 0,
        shuffled     : false,
        points       : 0,
        correct      : null,
        correctName  : null,
        max          : MAX_QUESTIONS,
        lang         : 'en',
    };

    /**
     * fetchSource
     *
     * @param {String} source
     */
    fetchSource = ( source ) => {
        const myHeaders = new Headers( {
            'X-Api-Key' : API_KEY,
            'Host'      : 'https://newsapi.org',
        }
        );

        const myInit = {
            method  : 'GET',
            headers : myHeaders,
            mode    : 'cors',
            host    : 'https://newsapi.org',
        };

        fetch( `${API_URL}/articles?source=${source}`, myInit )
            .then( resp => resp.json() )
            .then(
                resp => {
                    const oldHeadlines = this.state.headlines;
                    const newHeadlines = resp.articles;
                    let counter = this.state.loaded;

                    counter += 1;

                    for ( let i = 0; i <= newHeadlines.length - 1; i++ ) {
                        oldHeadlines.push( {
                            title        : newHeadlines[ i ].title,
                            description  : newHeadlines[ i ].description,
                            source       : resp.source,

                        } );
                    }


                    const newState = {
                        headlines  : oldHeadlines,
                        loaded     : counter,
                    };

                    this.setState( newState );
                } )
            .catch( error => console.error( error ) );
    }
    /**
     * fetchSourceList
     *
     * @param  {string} lang
     */
    fetchSourceList = ( lang ) => {
        const myHeaders = new Headers( {
            'X-Api-Key' : API_KEY,
            'Host'      : 'https://newsapi.org',
        }
        );

        const myInit = {
            method  : 'GET',
            headers : myHeaders,
            mode    : 'cors',
            host    : 'https://newsapi.org',
        };

        fetch( `${API_URL}/sources?language=${lang}`, myInit )
            .then( resp => resp.json() )
            .then(
                resp => {
                    const { sources } = resp;

                    const newState = {
                        sources : sources,
                    };

                    this.setState( newState );
                } )
            .catch( error => console.error( error ) );
    }
    /**
     * shuffle
     * @param {array} array
     * @return {array} returns array
     */
    shuffle = ( array ) => {
        let currentIndex = array.length;
        let temporaryValue = 0;
        let randomIndex = 0;

        // While there remain elements to shuffle...
        while ( 0 !== currentIndex ) {

            // Pick a remaining element...
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[ currentIndex ];
            array[ currentIndex ] = array[ randomIndex ];
            array[ randomIndex ] = temporaryValue;
        }

        return array;
    }
    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount() {
        const { sources, lang, headlines } = this.state;

        if ( sources.length === 0 ) {
            this.fetchSourceList( lang );
        }

        if ( sources.length > 0 && headlines.length === 0 ) {
            sources.map( ( source ) => {
                this.fetchSource( source.id );
            } );
        }

    }
    /**
     * processHeadlines
     *
     * @param {array} headlines
     * @param {integer} max
     * @param {array} sources
     */
    processHeadlines = ( headlines, max, sources ) => {

        const newHeadlines = [];

        for ( let i = 0; i < headlines.length; i++ ) {

            const { title, description, source } = headlines[ i ];

            const filter = sources.filter( ( item ) => {
                if ( item.id === source ) {
                    return item.name;
                }
            } );

            if ( !title.includes( filter.name ) && !description.includes( filter.name ) ) {
                newHeadlines.push( headlines[ i ] );
            }
        }
        const shuffledHeadlines = this.shuffle( newHeadlines );

        if ( shuffledHeadlines.length > max ) {
            shuffledHeadlines.length = max;
        }

        this.setState( {
            headlines : shuffledHeadlines,
            shuffled  : true,
        } );
    }
    /**
     * componentDidUpdate
     */
    componentWillUpdate() {
        const { headlines, loaded, sources, max } = this.state;

        const toLoad = sources.length - 1;

        if ( loaded === toLoad ) {
            this.processHeadlines( headlines, max, sources );
        }
    }
    /**
     * componentDidUpdate
     */
    componentDidUpdate() {
        const { sources, headlines } = this.state;

        if ( sources.length > 0 && headlines.length === 0 ) {
            sources.map( ( source ) => {
                this.fetchSource( source.id );
            } );
        }
    }
    /**
     * checkAnswer
     *
     * check if Answer is correct
     * @param {[bool]} correct
     */
    checkAnswer = ( correct ) => {
        const { current, points, headlines, sources } = this.state;


        let newPoints = points;

        if ( correct ) {
            newPoints += 1;
        }

        //hide buttons
        if ( this.footerDiv != undefined ) {
            this.footerDiv.classList.add( 'hide' );
        }

        const correctSource = sources.filter( ( item ) => {
            if ( item.id === headlines[ current ].source ) {
                return item;
            }
        } );

        this.setState( {
            current     : current + 1,
            points      : newPoints,
            correct     : correct,
            correctName : correctSource[ 0 ].name,
        } );
    }

    /**
     *  App Render
     *
     *  @return {JSX} app element plus children
     */
    render() {


        const {
            headlines,
            loaded,
            shuffled,
            current,
            sources,
            points,
            correct,
            correctName } = this.state;

        const total = headlines.length - 1;

        if ( headlines === null || headlines === undefined || loaded === 0 || shuffled === false ) {
            return (
                <div className="wrapper">
                    <div className="headline">
                        loading... { loaded }
                    </div>
                </div>
            );
        }

        const msg = correct === false ? 'wrong' : 'correct';
        let msgDiv = null;

        if ( correct != null && current != total ) {
            msgDiv =  <div
                key={ `msg${current}` }
                className="result"
                ref={ msgBox => this.msgBox = msgBox }
            >
                <p>{msg}</p>
                <p>It was {correctName}</p>
            </div>;

            setTimeout( () => {
                this.msgBox.classList.add( 'hide' );
                this.footerDiv.classList.remove( 'hide' );
            }, RESULT_LENGTH );
        }

        if ( current === total ) {
            msgDiv =  <div
                key={ `msg${current}` }
                className="result"
                ref={ msgBox => this.msgBox = msgBox }
            >
                <p>{msg}</p>
                <p>It was {correctName}</p>
            </div>;

            setTimeout( () => {
                this.msgBox.classList.add( 'hide' );
                this.endDiv.classList.remove( 'hide' );
            }, RESULT_LENGTH );


            return (
                <div
                    className="wrapper"
                >
                    { msgDiv }
                    <div
                        className="end hide"
                        ref={ endDiv => this.endDiv = endDiv }
                    >
                        Congratulations!
                        <p>You got { points } Points</p>
                    </div>
                    <div
                        className="replay"
                        onClick={ () => {
                            document.location.reload();
                        } }
                    >
                        Play again
                    </div>
                </div>
            );
        }

        return (
            <div
                className="wrapper"
            >
                <div className="header">
                    <span>Question: { current + 1 } of { total + 1 }</span>
                    <span>Points: { points }</span>
                </div>
                { msgDiv }
                <Headline
                    title={ headlines[ current ].title }
                    description={ headlines[ current ].description }
                    source={ headlines[ current ].source }
                />
                <div
                    className="footer"
                    ref={ footerDiv => this.footerDiv = footerDiv }
                >
                    { sources.map( ( source, index ) => {
                        return <SourceButton
                            key={ index }
                            source={ source.id }
                            title={ source.name }
                            current={ headlines[ current ].source }
                            checkAnswer={ this.checkAnswer }
                        />;
                    }
                    )}
                </div>
            </div>
        );
    }
}
