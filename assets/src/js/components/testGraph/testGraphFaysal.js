import React, { Component } from 'react';
import clone from 'clone';
import JSONTree from 'react-json-tree';
const Graph = require('graphlib').Graph;
const graph = new Graph({ multigraph: true });
const graphPath = new Graph({ multigraph: true });
const number = 100;
const options = [
  { src: 'a', des: 'b', cost: 10 },
  { src: 'a', des: 'c', cost: 50 },
  { src: 'a', des: 'd', cost: 30 },
  { src: 'b', des: 'c', cost: 60 },
  { src: 'b', des: 'd', cost: 90 },
  { src: 'c', des: 'd', cost: 50 },
];
// function addOutput(e, line) {
//   if (e) {
//     console.log(e);
//     outPut.push(<p>{line}</p>);
//     outPut.push(<JSONTree data={e} />);
//     outPut.push(<p>-----------------------</p>);
//   }
// }
export default class TestGraphFaysalVy extends Component {
  constructor(props) {
    super(props);
    this.setCount = this.setCount.bind(this);
    this.createGraph();
    this.state = {
      customers: this.createCustomers(),
      lastIndex: -1,
      data: {},
    };
  }
  setNodes() {
    graph.setNode('a');
    graph.setNode('b');
    graph.setNode('c');
    graph.setNode('d');
    graph.setNode('e');
    graphPath.setNode('root');
    graphPath.setNode('a');
    graphPath.setNode('b');
    graphPath.setNode('c');
    graphPath.setNode('d');
    graphPath.setNode('e');
  }
  setEdges() {
    graphPath.setEdge('root', 'a', { weight: 1 });
    graphPath.setEdge('a', 'b', { weight: 1 });
    graphPath.setEdge('b', 'c', { weight: 1 });
    graphPath.setEdge('c', 'd', { weight: 1 });
    graphPath.setEdge('d', 'e', { weight: 1 });
    graph.setEdge('a', 'b', { cost: 10 });
    graph.setEdge('a', 'c', { cost: 20 });
    graph.setEdge('a', 'd', { cost: 30 });
    graph.setEdge('a', 'e', { cost: 40 });
    graph.setEdge('b', 'c', { cost: 1 });
    graph.setEdge('b', 'd', { cost: 1 });
    graph.setEdge('b', 'e', { cost: 1 });
    graph.setEdge('c', 'd', { cost: 1 });
    graph.setEdge('c', 'e', { cost: 1 });
    graph.setEdge('d', 'e', { cost: 1 });
  }
  setCount(option, customers) {
    let root = option.src;
    const failed = { failed: false };
    while (true) {
      const inEdges = graphPath.outEdges(root);
      const lastRoot = root;
      try {
        root = inEdges[0].w;
      } catch (e) {
        break;
      }
      const count = customers[root].count + option.cost;
      customers[root].count = count;
      if (count > number) {
        failed.failed = true;
        const maxNumber = customers[root].count - (count - number);
        if (!failed.maxNumber) {
          failed.maxNumber = maxNumber;
        } else if (failed.maxNumber > maxNumber) {
          failed.maxNumber = maxNumber;
        }
        if (!failed.lastnode) {
          failed.lastnode = lastRoot;
        }
      }
      if (root === option.des) {
        break;
      }
    }
    const data = {};
    data.failed = failed;
    data.option = option;
    data.customers = customers;
    console.log(failed);
    if (failed.failed === false) {
      this.setState({ customers, data });
    } else {
      this.setState({ data });
    }
  }
  createCustomers() {
    let root = 'root';
    const customers = {};
    while (true) {
      const inEdges = graphPath.outEdges(root);
      try {
        root = inEdges[0].w;
      } catch (e) {
        break;
      }
      customers[root] = {
        count: 0,
      };
    }
    return customers;
  }
  createGraph() {
    this.setNodes();
    this.setEdges();
    // addOutput(graph.nodes(), 'nodes');
    // addOutput(graph.edges(), 'edges');
  }
  render() {
    const { customers, data } = this.state;
    console.log(customers);
    console.log(data);
    // .setCounts(customers);
    // <JSONTree data={data} />
    return (<div >
      {options.map((option, index) => {
        const setCounts = () => {
          data.index = index;
          this.setCount(option, clone(customers));
        };
        return <button key={index} onClick={setCounts}>{`${option.src} - ${option.des}->${option.cost}`}</button>;
      })}
      <JSONTree data={clone(data)} />
    </div>);
  }
}
