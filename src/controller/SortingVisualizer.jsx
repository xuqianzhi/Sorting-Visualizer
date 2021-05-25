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

export default class SortingVisualizer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bars: [],
            bar_num: 100, //determines bar num, min: 8, max: 200;
            is_running: false,
            animation_speed: 3
        }
    }

    componentDidMount() {
        this.resetBarLengths();
    }

    resetBarLengths() {
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

    displayAnimation(bar_change_animation) {
        const curr_displayed_bars = document.getElementsByClassName("bar");
        const animation_speed = 1 / (2**(this.state.animation_speed));
        for (let i = 0; i < bar_change_animation.length; i++) {
            const changing_bar_index = bar_change_animation[i][0];
            const new_bar_height = bar_change_animation[i][1];
            let supporting_index = null;
            if (bar_change_animation[i].length == 3) {
                supporting_index = bar_change_animation[i][2];
            }
            setTimeout(() => {
                this.setState({is_running: true});
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
                if (supporting_index) {
                    curr_displayed_bars[supporting_index].style.backgroundColor = SUPPORTING_COLOR;
                }
                curr_displayed_bars[changing_bar_index].style.backgroundColor = CHANGING_BAR_COLOR;
            }, ANIMATION_LAG * animation_speed * i);
        }
        setTimeout(() => {
            for (let i = 0; i < this.state.bar_num; i++) {
                curr_displayed_bars[i].style.backgroundColor = FINISHED_COLOR;
            }
        }, ANIMATION_LAG * animation_speed * bar_change_animation.length);
        setTimeout(() => {
            this.setState({is_running: false});
        }, ANIMATION_LAG * animation_speed * bar_change_animation.length + 1000);
        setTimeout(() => {
            this.resetBarLengths();
        }, ANIMATION_LAG * animation_speed * bar_change_animation.length + 1500);
    }

    mergeSort() {
        const lst = this.state.bars.slice();
        let bar_change_animation = [];
        mergeSortAnimation(lst, 0, lst.length, bar_change_animation);
        this.displayAnimation(bar_change_animation);
    }

    quickSort() {
        const lst = this.state.bars.slice();
        let bar_change_animation = [];
        quickSortAnimation(lst, 0, lst.length, bar_change_animation);
        this.displayAnimation(bar_change_animation);
    }

    insertionSort() {
        const lst = this.state.bars.slice();
        let bar_change_animation = [];
        insertionSortAnimation(lst, bar_change_animation);
        this.displayAnimation(bar_change_animation);
    }

    bubbleSort() {
        const lst = this.state.bars.slice();
        let bar_change_animation = [];
        bubbleSortAnimation(lst, bar_change_animation);
        this.displayAnimation(bar_change_animation);
    }

    heapSort() {
        const lst = this.state.bars.slice();
        let bar_change_animation = [];
        heapSortAnimation(lst, bar_change_animation);
        this.displayAnimation(bar_change_animation);
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
    
    render() {
        const bars = this.state.bars.slice();
        const bar_num = this.state.bar_num;
        const is_running = this.state.is_running;
        const initial_button_position = 7;
        const animation_speed = 2**(this.state.animation_speed);
        return (
            <div>
                <div className='button-container'>
                    <button className='button' onClick={() => this.mergeSort()} 
                        style={is_running ? {display: 'none'} : {display: 'inline-block', left: `${initial_button_position}%`}}>Merge Sort</button>
                    <button className='button' onClick={() => this.quickSort()} 
                        style={is_running ? {display: 'none'} : {display: 'inline-block', left: `${initial_button_position + 15}%`}}>Quick Sort</button>
                    <button className='button' onClick={() => this.insertionSort()} 
                        style={is_running ? {display: 'none'} : {display: 'inline-block', left: `${initial_button_position + 30}%`}}>Insertion Sort</button>
                    <button className='button' onClick={() => this.bubbleSort()} 
                        style={is_running ? {display: 'none'} : {display: 'inline-block', left: `${initial_button_position + 45}%`}}>Bubble Sort</button>
                    <button className='button' onClick={() => this.heapSort()} 
                        style={is_running ? {display: 'none'} : {display: 'inline-block', left: `${initial_button_position + 60}%`}}>Heap Sort</button>
                    <div className='side-container' style={is_running ? {display: 'none'} : {display: 'inline-block'}}>
                        <label style={{position: 'absolute', top: '0%', right: '10px', fontSize: '22px', color: 'white', fontWeight: 'bold'}} > {animation_speed}X </label>
                        <input 
                            type="range" 
                            min={0} max={4} // 2^x
                            value={this.state.animation_speed} 
                            id="speedSlider" 
                            className='speed-slider'
                            style={is_running ? {display: 'none'} : {display: 'inline-block'}}
                            onChange={(event) => this.speedSliderChanged(event)}/>
                    </div>
                </div>

                <div className='bar-container'>
                    <input 
                        type="range" 
                        min={8} max={200} 
                        value={this.state.bar_num} 
                        id="barNumSlider" 
                        className='barnum-slider'
                        style={is_running ? {display: 'none'} : {display: 'inline-block'}}
                        onChange={(event) => this.barNumSliderChanged(event)}/>
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
                </div>
            </div>
        )
    }
}