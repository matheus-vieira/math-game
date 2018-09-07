import React from "react";
// import GithubUser from '../github_user/github_user';
import { ProgressBar } from 'react-materialize';

import Api from '../../api';

class GithubUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        Api.on('addPlayer', (player) => this.players.add(player));
        Api.on('score', (player) => player.score());
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<ProgressBar />);
        } else {
            return (items.map(item => (<GithubUser login={item.login} avatar={item.avatar} />)));
        }
    }
}
  
 export default GithubUsers;