import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import { DetailAttribute } from "../DetailComponents/DetailComponents";

class FormDateRow extends React.Component {
    constructor() {
        super();
    };

    state = {
        buttonDownOpacity: 1
    };

    componentDidMount() {
        if (this.props.behavesAsForm) {
            this.setState({ buttonDownOpacity: .2 })
        }
    }

    componentWillReceiveProps(nextProps) {
        const btnDownOpacity = (nextProps.behavesAsForm) ? .2 : 1;
        this.setState({ buttonDownOpacity: btnDownOpacity });
    }

    onRowPressed = () => {
        if (this.props.behavesAsForm) {
            this.props.showDatePicker();
        }
    };

    render() {
        const { label, icon, value, setFieldValue } = this.props;
        return (
            <TouchableOpacity onPress={this.onRowPressed} activeOpacity={this.state.buttonDownOpacity}>
                <DetailAttribute label={label} icon={icon} value={value} setFieldValue={setFieldValue}/>
            </TouchableOpacity>
        );
    }
}

module.exports = FormDateRow;