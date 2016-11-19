import * as React from 'react';

export default class GameContainer extends React.PureComponent<{}, {}> {
	gameId: number;

	constructor(props: any) {
		super(props);
		this.gameId = +props.location.query.id;
		//TODO: Figure out the proper way of getting this.
		//      As of right now, changing the hash will not update the page.
	}

	render() {
		return(
			<p>This would be the results of your game #{this.gameId}.</p>
		);
	}
}
