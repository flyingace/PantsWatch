import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { Button, ButtonGroup } from 'react-native-elements';

const styles = StyleSheet.create({
    actionBar: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red'
        // alignContent: 'flex-start'
    },
    buttonContainer: {
        flex: 2,
        padding: 0,
        margin: 0,
        width: 50

    },
    actionBarButton: {
        flex: 1,
        margin: 0
    }

});


class ActionBar extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    onButtonPress = (pressedIndex) => {
        console.log(this.props);
        // this.setState({selectedIndex})
    };

    render() {
        return (
            <View style={styles.actionBar}>
                <Button title={'Wear'}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.actionBarButton}/>
                <Button title={'Wash'}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.actionBarButton}/>
                <Button title={'Edit'}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.actionBarButton}/>
                <Button title={'Delete'}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.actionBarButton}/>
            </View>
        )
    }
}


module.exports = ActionBar;

/*
*                     onPress = {() => this.props.selectPants(this.props.pantsId)}

                    onPress = {() => this.props.resetWearCount(this.props.pantsId)}

                    onPress = {() => navigate('AddPants', { updateId: this.props.pantsId })}

                    onPress = {() => this.props.deletePants(this.props.pantsId)}
*/