import React, { Component } from 'react';
import { getSpacing, selectComponent } from './Visualiser';

export default class ObjectVisualiser extends Component {

    constructor(props) {
        super(props);
        this.collapse = this.collapse.bind(this);
        this.state = {open: false};
    }

    collapse() {
        this.setState({open: !this.state.open});
    }

    render() {
        const { data, name, indent, useHljs } = this.props;
        const keys = Object.getOwnPropertyNames(data);
        let items = [];
        for (let i = 0; this.state.open && i < keys.length; i++) {
            var item = data[keys[i]];
            var VisualiserComponent = selectComponent(item);
            items.push(
                <VisualiserComponent
                    key={String(i)}
                    data={item}
                    name={keys[i]}
                    indent={indent == 0 ? indent + 2 : indent + 1}
                    useHljs={useHljs}
                />
            );
        }
        let arrow;
        let spaces = getSpacing(indent);
        if (keys.length > 0) {
            arrow = this.state.open ? '\u25bc' : '\u25b6';
            if (spaces.length >= 2) {
                // Space for arrow
                spaces = spaces.slice(2);
            }
        }
        const key = '\u00a0' + (name ?  name + ':\u00a0' : '');

        return (
            <div className="object-visualiser">
                <span className="visualiser-row">
                    <span className="visualiser-spacing">{spaces}</span>
                    <span className="visualiser-arrow" onClick={this.collapse}>{arrow}</span>
                    <span>{key}</span>
                    <span className={useHljs ? "hljs-keyword" : ""}>Object</span>
                    <span>{'{}'}</span>
                </span>
                {items}
            </div>
        );
    }

}