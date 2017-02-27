import React, { Component } from 'react';
import clone from 'clone';
import JSONTree from 'react-json-tree';
const Graph = require('graphlib').Graph;
const graph = new Graph({ multigraph: true });
const number = 2000;
const options = [
  ['clothing', 'music', 'travels', 'tshirt', 'hoody', 'song', 'artist', 'album'],
  ['red', 'blue', 'green'],
];
const sortingList = ['name+', 'name-', 'id+', 'id-', 'price+', 'price-', 'date+', 'date-'];// let outPut = [];

// function addOutput(e, line) {
//   if (e) {
//     console.log(e);
//     outPut.push(<p>{line}</p>);
//     outPut.push(<JSONTree data={e} />);
//     outPut.push(<p>-----------------------</p>);
//   }
// }
export default class TestGraph extends Component {
  constructor(props) {
    super(props);
    this.getSelectedNodes = this.getSelectedNodes.bind(this);
    this.getSelectedPosts = this.getSelectedPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.createGraph();
    this.state = {
      selectedTex: this.setSelectedTex(),
      sorting: null,
    };
  }
  setNodes() {
    const dates = ['2016-05-08 07:45:39', '2016-04-08 07:45:39', '2016-01-08 07:45:39', '2016-09-01 07:45:39', '2011-09-08 07:45:39', '2015-09-08 07:45:39', '2016-09-05 07:45:39', '2016-09-08 07:25:39', '2016-09-28 07:45:39', '2019-09-28 07:45:39'];
    graph.setNode('roottex', { type: 'roottex', label: 'roottex' });
    graph.setNode('clothing', { type: 'tex', label: 'Clothing' });
    graph.setNode('music', { type: 'tex', label: 'Music' });
    graph.setNode('travels', { type: 'tex', label: 'Travel' });
    graph.setNode('color', { type: 'tex', label: 'Album' });
    graph.setNode('tshirt', { type: 'tex', label: 'T shirt' });
    graph.setNode('hoody', { type: 'tex', label: 'Hoodey' });
    graph.setNode('artist', { type: 'tex', label: 'Artist' });
    graph.setNode('song', { type: 'tex', label: 'Song' });
    graph.setNode('album', { type: 'tex', label: 'Album' });
    graph.setNode('green', { type: 'tex', label: 'green' });
    graph.setNode('blue', { type: 'tex', label: 'Blue' });
    graph.setNode('red', { type: 'tex', label: 'Red' });
    for (let i = 0; i < number; i++) {
      graph.setNode(`tshirt${i}`, { type: 'post', label: `Tshirt ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
      graph.setNode(`hoody${i}`, { type: 'post', label: `hoody ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
      graph.setNode(`artist${i}`, { type: 'post', label: `artist ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
      graph.setNode(`song${i}`, { type: 'post', label: `song ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
      graph.setNode(`album${i}`, { type: 'post', label: `album ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
      graph.setNode(`travels${i}`, { type: 'post', label: `travels ${i}`, price: `${Math.random() * (100.5, 10000.9)}`, date: dates[i % 10] });
    }
  }
  setEdges() {
    graph.setEdge('roottex', 'clothing', { weight: 1 });
    graph.setEdge('roottex', 'music', { weight: 1 });
    graph.setEdge('roottex', 'travels', { weight: 1 });
    graph.setEdge('clothing', 'tshirt', { weight: 1 });
    graph.setEdge('clothing', 'hoody', { weight: 1 });
    graph.setEdge('music', 'artist', { weight: 1 });
    graph.setEdge('music', 'song', { weight: 1 });
    graph.setEdge('music', 'album', { weight: 1 });
    graph.setEdge('color', 'red', { weight: 1 });
    graph.setEdge('color', 'blue', { weight: 1 });
    graph.setEdge('color', 'green', { weight: 1 });
    for (let i = 0; i < number; i++) {
      graph.setEdge(`tshirt${i}`, 'tshirt', { weight: 1 });
      graph.setEdge(`hoody${i}`, 'hoody', { weight: 1 });
      graph.setEdge(`artist${i}`, 'artist', { weight: 1 });
      graph.setEdge(`song${i}`, 'song', { weight: 1 });
      graph.setEdge(`album${i}`, 'album', { weight: 1 });
      graph.setEdge(`travels${i}`, 'travels', { weight: 1 });
      graph.setEdge(`tshirt${i}`, 'clothing', { weight: 1 });
      graph.setEdge(`hoody${i}`, 'clothing', { weight: 1 });
      graph.setEdge(`artist${i}`, 'music', { weight: 1 });
      graph.setEdge(`song${i}`, 'music', { weight: 1 });
      graph.setEdge(`album${i}`, 'music', { weight: 1 });
      graph.setEdge(`travels${i}`, 'travels', { weight: 1 });
      graph.setEdge(`tshirt${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`hoody${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`artist${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`song${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`album${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`travels${i}`, 'roottex', { weight: 1 });
      graph.setEdge(`tshirt${i}`, options[1][i % 3], { weight: 1 });
      graph.setEdge(`hoody${i}`, options[1][i % 3], { weight: 1 });
    }
  }
  setSelectedTex() {
    return [
      ['clothing', 'tshirt', 'hoody', 'music', 'song', 'travels'],
      ['red'],
    ];
  }
  getSelectedNodes(nodeName, selectedTex) {
    const outEdges = clone(graph.outEdges(nodeName));
    const index = selectedTex.findIndex((tex) => tex === nodeName);
    if (index !== -1) {
      selectedTex.splice(index, 1);
    }
    let selecteNodes = [];
    selectedTex.forEach(texonomy => {
      if (outEdges.findIndex((tex) => tex.w === texonomy) !== -1) {
        const nodes = clone(this.getSelectedNodes(clone(texonomy), clone(selectedTex)));
        selecteNodes = selecteNodes.concat(nodes);
      }
    });
    if (selecteNodes.length === 0) {
      selecteNodes.push(nodeName);
    }
    return selecteNodes;
  }
  getPosts(nodes) {
    const posts = [];
    nodes.forEach(node => {
      const inEdges = graph.inEdges(node);
      inEdges.forEach(inEdge => {
        if (graph.node(inEdge.v).type === 'post') {
          posts.push(inEdge.v);
        }
      });
    });
    return posts;
  }
  getSort(posts, sorting, showNumber) {
    let newPosts = posts;
    if (sorting) {
      newPosts = posts.sort((first, second) => {
        const firstNode = graph.node(first);
        const secondNode = graph.node(second);
        let fItem = first;
        let sITem = second;
        switch (sorting) {
          case 'name+':
            fItem = firstNode.label.toLowerCase();
            sITem = secondNode.label.toLowerCase();
            break;
          case 'name-':
            fItem = secondNode.label.toLowerCase();
            sITem = firstNode.label.toLowerCase();
            break;
          case 'id-':
            fItem = second;
            sITem = first;
            break;
          case 'price+':
            fItem = parseFloat(secondNode.price);
            sITem = parseFloat(firstNode.price);
            break;
          case 'price-':
            fItem = parseFloat(firstNode.price);
            sITem = parseFloat(secondNode.price);
            break;
          case 'date+':
            fItem = new Date(secondNode.date);
            sITem = new Date(firstNode.date);
            break;
          case 'date-':
            fItem = new Date(firstNode.date);
            sITem = new Date(secondNode.date);
            break;
          default:
            fItem = first;
            sITem = second;
        }
        if (fItem < sITem) {
          return -1;
        }
        if (fItem > sITem) {
          return 1;
        }
        return 0;
      });
    }
    if (showNumber && newPosts.length > showNumber) {
      newPosts.length = showNumber;
    }
    return newPosts.map(post => {
      return { id: post, ...graph.node(post) };
    });
  }
  getSelectedPosts(showNumber) {
    let posts = this.getPosts(this.getSelectedNodes('roottex', ['roottex']));
    const opts = ['roottex', 'color'];
    this.state.selectedTex.forEach((selectedTex, index) => {
      if (selectedTex.length > 0) {
        const posts2 = this.getPosts(this.getSelectedNodes(opts[index], clone(selectedTex)));
        if (posts.length > posts2.length) {
          posts = this.andOperation(posts2, posts);
        } else {
          posts = this.andOperation(posts, posts2);
        }
      }
    });
    return this.getSort(posts, this.state.sorting, showNumber);
  }
  createGraph() {
    this.setNodes();
    this.setEdges();
    // addOutput(graph.nodes(), 'nodes');
    // addOutput(graph.edges(), 'edges');
  }
  andOperation(posts1, posts2) {
    const newPoests = [];
    posts1.forEach(post => {
      if (posts2.findIndex((p) => p === post) !== -1) {
        newPoests.push(post);
      }
    });
    return newPoests;
  }
  render() {
    const data = this.getSelectedPosts(10);
    const createOptions = () => {
      const selectedTex = this.state.selectedTex;
      const optionItems = [];
      for (let i = 0; i < options.length; i++) {
        optionItems.push(<div>{options[i].map(option => {
          const index = selectedTex[i].findIndex(opt => opt === option);
          const backgroundColor = index === -1 ? '#fff' : '#80DEEA';
          const onClick = () => {
            if (index === -1) {
              selectedTex[i].push(option);
            } else {
              selectedTex[i].splice(index, 1);
            }
            this.setState({ selectedTex });
          };
          return (<button type="button" onClick={onClick}style={{ background: backgroundColor }}>{option}</button>);
        })}</div>);
      }
      return optionItems;
    };
    const createSorting = () => {
      const sorting = this.state.sorting;
      return (<div>{sortingList.map(opt => {
        const index = sorting === opt;
        const backgroundColor = index === false ? '#fff' : '#80DEEA';
        const onClick = () => {
          if (index === true) {
            this.setState({ sorting: '' });
          } else {
            this.setState({ sorting: opt });
          }
        };
        return (<button type="button" onClick={onClick}style={{ background: backgroundColor }}>{opt}</button>);
      })}</div>);
    };
    return (<div >
      {createOptions()}
      {createSorting()}
      {data.length}
      <JSONTree data={data} />
    </div>);
  }
}
