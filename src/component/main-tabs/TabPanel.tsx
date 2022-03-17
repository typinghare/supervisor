import * as React from 'react';
import { Component } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default class TabPanel extends Component<TabPanelProps, any> {
  render() {
    return (
      <div
        role='tabpanel'
        hidden={this.props.value !== this.props.index}
        aria-labelledby={`supervisor-panel-tab-${this.props.index}`}
      >
        {this.props.value === this.props.index && (
          <div>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}