import React, { Component, useState } from 'react';
import reactDom from 'react-dom';
import '../view/SortingVisualizer.css'
import {mergeSortAnimation} from '../model/MergeSort.js'
import {quickSortAnimation} from '../model/QuickSort.js'
import {insertionSortAnimation} from '../model/InsertionSort.js'
import {bubbleSortAnimation} from '../model/BubbleSort.js'
import {heapSortAnimation} from '../model/HeapSort.js'
import {randomIntFromInterval, isArraySorted} from '../model/HelperFunctions.js'

const ANIMATION_LAG = 50;
const MAIN_BAR_COLOR = "rgb(187, 145, 248)";
const CHANGING_BAR_COLOR = "rgb(252, 242, 81)"
const SUPPORTING_COLOR = "darkorange"
const FINISHED_COLOR = "mediumaquamarine"
const RUNNING_STATUS = Object.freeze({'running': 'running', 'pausing': 'pausing', 'not_running': 'not_running'})

export default class SortingVisualizer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bars: [],
            bar_num: 100, //determines bar num, min: 8, max: 200;
            running_status: RUNNING_STATUS.not_running,
            animation_speed: 2,
            timeoutIDs: [], //for clearTimeout
            bar_change_animation: [], //for pausing and continuing animation
            animation_begin_at: 0 //for pausing and continuing animation
        }
    }

    componentDidMount() {
        this.resetBars();
    }

    resetBars() {
        const buf = [];
        const curr_displayed_bars = document.getElementsByClassName("bar");
        for (let i = 0; i < this.state.bar_num; i++) {
            buf.push(randomIntFromInterval(5, 300));
            if (curr_displayed_bars[i]) {
                curr_displayed_bars[i].style.backgroundColor = MAIN_BAR_COLOR;
            }
        }
        this.setState({bars: buf});
    }

    displayAnimation(bar_change_animation, animation_begin_at) {
        const curr_displayed_bars = document.getElementsByClassName("bar");
        const animation_speed = 1 / (2**(this.state.animation_speed));
        var timeoutIDs = [];
        for (let i = animation_begin_at; i < bar_change_animation.length; i++) {
            const changing_bar_index = bar_change_animation[i][0];
            const new_bar_height = bar_change_animation[i][1];
            let supporting_index = null;
            if (bar_change_animation[i].length == 3) {
                supporting_index = bar_change_animation[i][2];
            }

            // begin animation
            const currTimeoutID = setTimeout(() => {
                this.setState({running_status: RUNNING_STATUS.running});
                if (i != 0) {
                    const prev_changing_bar_index = bar_change_animation[i - 1][0];
                    curr_displayed_bars[prev_changing_bar_index].style.backgroundColor = MAIN_BAR_COLOR;
                    if (bar_change_animation[i - 1].length == 3) {
                        const prev_supporting_index = bar_change_animation[i - 1][2];
                        curr_displayed_bars[prev_supporting_index].style.backgroundColor = MAIN_BAR_COLOR;
                    }
                }
                let buf = this.state.bars;
                buf[changing_bar_index] = new_bar_height;
                this.setState({bars: buf});
                if (supporting_index) { // supporting index exist
                    curr_displayed_bars[supporting_index].style.backgroundColor = SUPPORTING_COLOR;
                }
                curr_displayed_bars[changing_bar_index].style.backgroundColor = CHANGING_BAR_COLOR;
                this.setState({animation_begin_at: i}) // keep track of current index for pausing and continuing
            }, ANIMATION_LAG * animation_speed * (i - animation_begin_at));
            timeoutIDs.push(currTimeoutID);
        }

        // animation stopped
        const id1 = setTimeout(() => {
            this.setState({animation_begin_at: 0, bar_change_animation: []});
            document.getElementById('pause-button').style.display = 'none';
            document.getElementById('stop-button').style.display = 'none';
            for (let i = 0; i < this.state.bar_num; i++) {
                curr_displayed_bars[i].style.backgroundColor = FINISHED_COLOR;
            }
        }, ANIMATION_LAG * animation_speed * (bar_change_animation.length - animation_begin_at));
        const id2 = setTimeout(() => {
            this.setState({running_status: RUNNING_STATUS.not_running});
        }, ANIMATION_LAG * animation_speed * (bar_change_animation.length - animation_begin_at) + 1000);
        const id3 = setTimeout(() => {
            this.resetBars();
        }, ANIMATION_LAG * animation_speed * (bar_change_animation.length - animation_begin_at) + 1500);

        timeoutIDs.push(id1);
        timeoutIDs.push(id2);
        timeoutIDs.push(id3);
        this.setState({timeoutIDs, timeoutIDs});
    }

    sortAndDisplay(method) {
        /*
        method type: String
        method cases: merge, quick, insertion, bubble, heap 
        */
        const lst = this.state.bars.slice();
        var bar_change_animation = [];
        if (method === "merge") {
            mergeSortAnimation(lst, 0, lst.length, bar_change_animation);
        } else if (method === "quick") {
            quickSortAnimation(lst, 0, lst.length, bar_change_animation);
        } else if (method === "insertion") {
            insertionSortAnimation(lst, bar_change_animation);
        } else if (method === "bubble") {
            bubbleSortAnimation(lst, bar_change_animation);
        } else if (method === "heap") {
            heapSortAnimation(lst, bar_change_animation);
        } else {
            return;
        }
        this.displayAnimation(bar_change_animation, 0);
        this.setState({bar_change_animation: bar_change_animation});
    }

    barNumSliderChanged(event) {
        const val = parseInt(event.target.value);
        const buf = [];
        const curr_displayed_bars = document.getElementsByClassName("bar");
        for (let i = 0; i < val; i++) {
            buf.push(randomIntFromInterval(5, 300));
            if (curr_displayed_bars[i]) {
                curr_displayed_bars[i].style.backgroundColor = MAIN_BAR_COLOR;
            }
        }
        this.setState({bar_num: val, bars: buf});
    }

    speedSliderChanged(event) {
        const val = parseInt(event.target.value);
        this.setState({animation_speed: val});
    }

    clearOngoingAnimation() {
        const timeoutIDs = this.state.timeoutIDs;
        if (timeoutIDs.length == 0) {
            return;
        }
        for (let i = 0; i < timeoutIDs.length; i++) {
            const currID = timeoutIDs[i];
            clearTimeout(currID);
        }
    }

    pauseAnimation() {
        this.clearOngoingAnimation();
        this.setState({running_status: RUNNING_STATUS.pausing, timeoutIDs: []});
    }

    continueAnimation() {
        this.displayAnimation(this.state.bar_change_animation, this.state.animation_begin_at);
    }

    stopAndResetAnimation() {
        this.clearOngoingAnimation();
        this.setState({timeoutIDs: [], bar_change_animation: [], animation_begin_at: 0, running_status: RUNNING_STATUS.not_running});
        this.resetBars();
    }
    
    render() {
        const bars = this.state.bars.slice();
        const bar_num = this.state.bar_num;
        const running_status = this.state.running_status;
        const initial_button_position = 7;
        const animation_speed = 2**(this.state.animation_speed);
        return (
            <div>
                <div className='button-container'>
                    <button className='button' onClick={() => this.sortAndDisplay('merge')} 
                        style={running_status == 'not_running' ? {display: 'inline-block', left: `${initial_button_position}%`} : {display: 'none'}}>Merge Sort</button>
                    <button className='button' onClick={() => this.sortAndDisplay('quick')} 
                        style={running_status == 'not_running' ? {display: 'inline-block', left: `${initial_button_position + 15}%`} : {display: 'none'}}>Quick Sort</button>
                    <button className='button' onClick={() => this.sortAndDisplay('insertion')} 
                        style={running_status == 'not_running' ? {display: 'inline-block', left: `${initial_button_position + 30}%`} : {display: 'none'}}>Insertion Sort</button>
                    <button className='button' onClick={() => this.sortAndDisplay('bubble')} 
                        style={running_status == 'not_running' ? {display: 'inline-block', left: `${initial_button_position + 45}%`} : {display: 'none'}}>Bubble Sort</button>
                    <button className='button' onClick={() => this.sortAndDisplay('heap')} 
                        style={running_status == 'not_running' ? {display: 'inline-block', left: `${initial_button_position + 60}%`} : {display: 'none'}}>Heap Sort</button>
                    <div className='side-container' style={running_status == 'not_running' ?  {display: 'inline-block'} : {display: 'none'}}>
                        <label style={{position: 'absolute', top: '0%', right: '-10px', fontSize: '21px', color: 'white', fontWeight: 'bold', width: '150%'}} >Animation Speed: {animation_speed}X</label>
                        <input 
                            type="range" 
                            min={0} max={4} // 2^x
                            value={this.state.animation_speed} 
                            id="speedSlider" 
                            className='speed-slider'
                            style={running_status == 'not_running' ? {display: 'inline-block', right: '20px'} : {display: 'none'}}
                            onChange={(event) => this.speedSliderChanged(event)}/>
                    </div>

                    <button 
                        className='button'
                        id='pause-button'
                        onClick={() => this.pauseAnimation()}
                        style={running_status == 'running' ? {display: 'inline-block', left: '38%', backgroundColor: 'gold'} : {display: 'none'}}
                        > Pause </button>
                    
                    <button 
                        className='button'
                        onClick={() => this.continueAnimation()}
                        style={running_status == 'pausing' ? {display: 'inline-block', left: '38%', backgroundColor: FINISHED_COLOR} : {display: 'none'}}
                        > Continue </button>
                    <button 
                        className='button'
                        id='stop-button'
                        onClick={() => this.stopAndResetAnimation()}
                        style={running_status == 'not_running' ? {display: 'none'} : {display: 'inline-block', right: '30%', backgroundColor: 'crimson', width: '10%' }}
                        > Stop and Reset </button>
                    
                </div>

                <div className='bar-container'>
                    {bars.map((val, idx) => (
                        <div 
                        className='bar'
                        key={idx}
                        style={{
                            height: `${val}px`,
                            left: `${idx / (bar_num + 2) * 1000 + (1000 / (bar_num + 2) - 2)}px`,
                            backgroundColor: MAIN_BAR_COLOR,
                            width: `${1000 / (bar_num + 2) - 2}px`,
                        }}>
                        </div>
                    ))}
                    <input 
                        type="range" 
                        min={8} max={200} 
                        value={this.state.bar_num} 
                        id="barNumSlider" 
                        className='barnum-slider'
                        style={running_status == 'not_running' ? {display: 'inline-block'} : {display: 'none'}}
                        onChange={(event) => this.barNumSliderChanged(event)}/>
                </div>
            </div>
        )
    }
}