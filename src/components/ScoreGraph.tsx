import * as React from 'react';
import { IGameScore } from '~/models';
import * as styles from './ScoreGraph.scss';
import * as d3 from 'd3';

interface IScoreGraphProps {
	id: number;
	scores: IGameScore[];
}

interface IData {
	total: number;
}

export default class ScoreGraph extends React.PureComponent<IScoreGraphProps> {
	private rootNode: SVGElement;

	componentWillUpdate() {
		while (this.rootNode.firstChild) {
			this.rootNode.removeChild(this.rootNode.firstChild);
		}
	}

	drawChart = () => {
		const { id, scores } = this.props;
		const data = [[{ total: 0 }], ...scores]
			.reduce((a: IData[], b: IGameScore) => [...a, { total: a[a.length - 1].total + b.score }]) as IData[];

		const margin = 0;
		const width = this.rootNode.clientWidth - 2 * margin;
		const height = this.rootNode.clientHeight - 2 * margin;
		const y = d3.scaleLinear().range([height, 0]);
		const x = d3.scaleLinear().range([0, width]);
		const area = d3.area()
			.x((d, i) => { d = d; return x(i); })
			.y0(height)
			.y1((d: any) => y(d.total));
		const line = d3.line()
			.x((d, i) => { d = d; return x(i); })
			.y((d: any) => y(d.total));

		const svg = d3.select(this.rootNode)
			.append('g')
			.attr('transform', `translate(${margin},${margin})`);

		y.domain([
			Math.min(-10, d3.min(data, d => d.total)),
			Math.max(10, d3.max(data, d => d.total))
		]);
		x.domain([0, data.length - 1]);

		const yMid = y(0);
		area.y0(yMid);

		const defs = svg.append('defs');
		defs.append('clipPath')
			.attr('id', `clip-above-${id}`)
			.append('rect')
			.attr('width', width)
			.attr('height', yMid);
		defs.append('clipPath')
			.attr('id', `clip-below-${id}`)
			.append('rect')
			.attr('y', yMid)
			.attr('width', width)
			.attr('height', height - yMid);

		svg.append('line')
			.attr('x1', x(0))
			.attr('x2', x(data.length - 1))
			.attr('y1', yMid)
			.attr('y2', yMid)
			.attr('class', styles.axisX);

		svg.append('path')
			.datum(data)
			.attr('clip-path', `url(#clip-above-${id})`)
			.attr('class', `${styles.area} ${styles.areaAbove}`)
			.attr('d', area as any);

		svg.append('path')
			.datum(data)
			.attr('clip-path', `url(#clip-below-${id})`)
			.attr('class', `${styles.area} ${styles.areaBelow}`)
			.attr('d', area as any);

		svg.append('path')
			.datum(data)
			.attr('clip-path', `url(#clip-above-${id})`)
			.attr('class', `${styles.line} ${styles.lineAbove}`)
			.attr('d', line as any);

		svg.append('path')
			.datum(data)
			.attr('clip-path', `url(#clip-below-${id})`)
			.attr('class', `${styles.line} ${styles.lineBelow}`)
			.attr('d', line as any);
	}

	render() {
		if (this.rootNode) {
			this.drawChart();
		} else {
			setTimeout(() => this.drawChart(), 0);
		}
		return (
			<svg ref={node => this.rootNode = node} className={styles.root}></svg>
		);
	}
}
