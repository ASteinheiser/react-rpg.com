import React from 'react';
import reactCSS from 'reactcss';
import { HuePicker } from 'react-color';

class ColourPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: {
                h: '0',
                s: '0',
                l: '1',
            },
        };
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    handleChange = color => {
        this.setState({ color: color.hsl });
        typeof this.props.onChange === 'function' &&
            this.props.onChange(color.hsl.h);
    };

    render() {
        const styles = reactCSS({
            default: {
                color: {
                    width: '20px',
                    height: '14px',
                    background: `hsl(${this.state.color.h}, ${this.state.color
                        .s * 100}%, ${this.state.color.l * 100}%)`,
                },
                swatch: {
                    padding: '3px',
                    background: '#000',
                    border: '1px solid gray',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    right: '5vh',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? (
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleClose} />
                        <HuePicker
                            width="180px"
                            color={this.state.color}
                            onChange={this.handleChange}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ColourPicker;
