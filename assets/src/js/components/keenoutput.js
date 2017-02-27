import React, { Component } from 'react';
import clone from 'clone';
// import Keen from 'keen-dataviz';
// import Dataviz from 'keen-dataviz';

export default class KeenOutput extends Component {
  constructor(props) {
    super(props);

    const client = new Keen({
      projectId: '5811dfd38db53dfda8a759c0',
      readKey: '83C84C12E1BED550E83DF7EE18F01D630BE3809B772FBD229A6A223DDEB310F6C90C31DE5F9FD4C4496A35504592A201A42F50BAC3ECD21586AFD1F6D52297D8DC97D373CD29223FE15F48DB7185FB75B62B09ECBBAECD7ACFC57D413CD51439',
    });
    this.getExtraction = this.getExtraction.bind(this);
    this.createChart = this.createChart.bind(this);
    this.showDiv = this.showDiv.bind(this);
    // this.getExtraction(client);
    const fieldTypeKeys = {
      el: 1,
      title: 'Field Type',
      type: 'barchart',
      group_by: 'fieldType',
      timeframe: 'this_14_days',
    };
    const metaKeys = {
      el: 2,
      title: 'Meta Keys',
      type: 'columnchart',
      group_by: 'metaKey',
      timeframe: 'this_14_days',
      filters: [
        {
          property_name: 'type',
          operator: 'eq',
          property_value: 'meta',
        }
      ],
    };
    const metaKeys1 = {
      el: 3,
      title: 'Meta Value',
      type: 'piechart',
      group_by: 'metaValue',
      timeframe: 'this_14_days',
      filters: [
        {
          property_name: 'type',
          operator: 'eq',
          property_value: 'meta',
        }
      ],
    };

    const textKeys = {
      el: 4,
      title: 'Text search',
      type: 'barchart',
      group_by: 's',
      timeframe: 'this_14_days',
      filters: [
        {
          property_name: 'type',
          operator: 'eq',
          property_value: 'textSearch',
        }
      ],
    };
    const texanomy = {
      el: 5,
      title: 'Texanomy Key',
      type: 'columnchart',
      group_by: 'texanomy',
      timeframe: 'this_14_days',
      filters: [
        {
          property_name: 'type',
          operator: 'eq',
          property_value: 'texanomy',
        }
      ],
    };
    const texanomy1 = {
      el: 6,
      title: 'Texanomy Value',
      type: 'piechart',
      group_by: 'texanomyValue',
      timeframe: 'this_14_days',
      filters: [
        {
          property_name: 'type',
          operator: 'eq',
          property_value: 'texanomy',
        }
      ],
    };
    this.state = {
      result: [],
      length: 6,
      client,
      metaKeys,
      metaKeys1,
      textKeys,
      texanomy,
      texanomy1,
      fieldTypeKeys,
    };
  }
  componentDidMount() {
    this.createChart(this.state.metaKeys);
    this.createChart(this.state.metaKeys1);
    this.createChart(this.state.textKeys);
    this.createChart(this.state.texanomy);
    this.createChart(this.state.texanomy1);
    this.createChart(this.state.fieldTypeKeys);
  }
	getExtraction(client) {
		const self = this;
		const extraction = new Keen.Query("extraction", {
      event_collection: 'pageviews',
      timeframe: 'this_7_days',
    });

    client.run(extraction, function(err, response){
      // if (err) handle the error
      console.log('extraction results: ', response.result);
      // => [{ "price" => 20, ... }, { ... }]
      
      self.setState({
        result: response.result,
      });
    });
	}
  createChart(keys) {
    const { client } = this.state;
    const chart = new Dataviz()
      .el(`#chart${keys.el}`)
      // .height(500)
      .width(300)
      .title(keys.title)
      .type('table')
      // .labels(['keys.group_by', 'count'])
      // .labelMapping({
      //   'visit_adv_inbound': 'Result',
      //   'Result': 'Viewed signup page'
      // })
      .prepare();
    const chartGraph = new Dataviz()
      .el(`#chart${keys.el * 100}`)
      // .height(500)
      .width(300)
      .title(keys.title)
      .type(keys.type)
      // .labels(['keys.group_by', 'count'])
      // .labelMapping({
      //   'visit_adv_inbound': 'Result',
      //   'Result': 'Viewed signup page'
      // })
      .prepare();

    client
      .query('count', {
        event_collection: 'pageviews',
        timeframe: keys.timeframe,
        target_property: 'count',
        group_by: keys.group_by,
        labels: [keys.group_by, 'count'],
        filters: keys.filters,
      })
        .then((res) => {
        // Handle the result
          let newRes = clone(res.result);
          newRes = newRes.sort((a, b) => {
            return b.result - a.result;
          });
          if (res.result.length >= 10) {
            res.result.length = 10;
          }
          res.result = newRes;
          chart
            .data(res)
            .render();
          chartGraph
            .data(res)
            .render();
          document.getElementById(`chart${keys.el * 100}`).style.display = 'none';
        })
        .catch((err) => {
          // Handle the error
          chart
            .message(err.message);
        });
  }
  showDiv(event) {
    const visibleId = parseInt(event.target.id.replace('btn', ''), 10);
    document.getElementById(`chart${visibleId}`).style.display = 'block';
    console.log(slideW);
    if (visibleId > 99) {
      document.getElementById(`chart${visibleId / 100}`).style.display = 'none';
    } else {
      document.getElementById(`chart${visibleId * 100}`).style.display = 'none';
    }
  }
  render() {
    let headDiv = [];
    for (let i = 1; i <= this.state.length; i++) {
      headDiv.push(<div key={`chart${i}`}>
        <div>
          <button id={`btn${i}`} onClick={this.showDiv}>List</button>
          <button id={`btn${i * 100}`} onClick={this.showDiv}>Chart</button>
        </div>
        <div id={`chart${i}`}></div>
        <div id={`chart${i * 100}`}></div>
      </div>);
    }
    return (<div>
      {headDiv}
    </div>);
  }

}
