import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';

import {

  Header,

  BackButton,

  Txt,

} from "./styles";
import { Switch } from 'react-native-paper';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};

LocaleConfig.defaultLocale = 'es';

import moment from 'moment';
import 'moment/locale/es'
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';
import { Context } from '../../data/Context';
import { FontAwesome5, FontAwesome} from "@expo/vector-icons/";
import { Kohana } from 'react-native-textinput-effects';

import {
  useFonts, Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic,
  Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium,
  Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic,
  Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic
} from "@expo-google-fonts/poppins"

import { AppLoading } from "expo"


export default class CreateTask extends Component {

  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#87d396',
      },

    },
    currentDay: moment().format(),
    taskText: '',
    notesText: '',
    keyboardHeight: 0,
    visibleHeight: Dimensions.get('window').height,
    isAlarmSet: false,
    alarmTime: moment().format(),
    isDateTimePickerVisible: false,
    timeType: '',
    creatTodo: {},
    createEventAsyncRes: '',

  };


  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }



  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      visibleHeight:
        Dimensions.get('window').height - e.endCoordinates.height - 30,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };

  handleAlarmSet = () => {
    const { isAlarmSet } = this.state;
    this.setState({
      isAlarmSet: !isAlarmSet,
    });
  };

  synchronizeCalendar = async value => {
    const { navigation } = this.props;
    const { createNewCalendar } = navigation.state.params;
    const calendarId = await createNewCalendar();
    try {
      const createEventAsyncRes = await this._addEventsToCalendar(calendarId);
      this.setState(
        {
          createEventAsyncRes,
        },
        () => {
          this._handleCreateEventData(value);
        }
      );
    } catch (e) {
      Alert.alert(e.message);
    }
  };



  _addEventsToCalendar = async calendarId => {
    const { taskText, notesText, alarmTime } = this.state;
    const event = {
      title: taskText,
      notes: notesText,
      startDate: moment(alarmTime)
        .add(0, 'm')
        .toDate(),
      endDate: moment(alarmTime)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );

      return createEventAsyncRes;
    } catch (error) {
      console.log(error);
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleCreateEventData = async value => {
    const {
      state: {
        currentDay,
        taskText,
        notesText,
        isAlarmSet,
        alarmTime,
        createEventAsyncRes,
      },
      props: { navigation },
    } = this;
    const { updateCurrentTask, currentDate } = navigation.state.params;
    const creatTodo = {
      key: uuid(),
      date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format(
        'MM'
      )}-${moment(currentDay).format('DD')}`,
      todoList: [
        {
          key: uuid(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes,
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuid(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };

    await value.updateTodo(creatTodo);
    await updateCurrentTask(currentDate);
    navigation.goBack();
  };

  _handleDatePicked = date => {
    const { currentDay } = this.state;
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    this.setState({
      alarmTime: newModifiedDay,
    });

    this._hideDateTimePicker();
  };

  render() {
    const {
      state: {
        selectedDay,
        currentDay,
        taskText,
        visibleHeight,
        notesText,
        isAlarmSet,
        alarmTime,
        isDateTimePickerVisible,
      },
      props: { navigation },
    } = this;


    return (
      <Context.Consumer>
        {value => (
          <>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
             
              mode="time"
            />

            <View style={styles.container}>
              <Header>

                <BackButton onPress={() => navigation.goBack()}>
                  <FontAwesome5 name="arrow-left" size={24} color="#87d396"
          />

                </BackButton>
                <View>
                  <Txt style={{ fontFamily: "Poppins_400Regular" }}>Nueva actividad</Txt>
                </View>

              </Header>
              <View
                style={{
                  height: visibleHeight,
                }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 100,

                  }}
                >

                  <View style={styles.calenderContainer}>
                    <CalendarList
                      style={{
                        width: 350,
                        height: 350,
                        fontFamily: 'Poppins_400Regular'
                      }}
                      current={currentDay}
                      minDate={moment().format()}
                      horizontal
                      pastScrollRange={0}
                      pagingEnabled
                      calendarWidth={350}
                      onDayPress={day => {
                        this.setState({
                          selectedDay: {
                            [day.dateString]: {
                              selected: true,
                              selectedColor: '#87d396',
                            },
                          },
                          currentDay: day.dateString,
                          alarmTime: day.dateString,
                        });
                      }}
                      monthFormat="MMMM yyyy"
                      hideArrows={false}

                      markingType="simple"
                      theme={{
                        selectedDayBackgroundColor: '#87d396',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#600bc4',
                        backgroundColor: '#fff',
                        arrowColor: '#87d396',
                        calendarBackground: '#fff',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
                  </View>
                  <View style={styles.taskContainer}>
                    <Text style={styles.notes}>Actividad</Text>
                    <Kohana
                      style={{ backgroundColor: '#fff', fontFamily: "Poppins_300Light" }}
                      label={'Nombre de la actividad'}
                      iconClass={FontAwesome5}
                      iconName={'calendar-check'}

                      iconColor={'#87d396'}
                      inputPadding={5}
                      labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}
                      onChangeText={text => this.setState({ taskText: text })}
                      value={taskText}
                      maxLength={20}
                      returnKeyType="next"
                      onSubmitEditing={() => { this.notesText.focus(); }}
                      useNativeDriver

                    />

                    <View style={styles.notesContent} />
                  
                      <Text style={styles.notes}>Descripción</Text>
                      <Kohana
                           style={{
                            height: 25,
                            fontSize: 19,
                            marginTop: 3,
                          }}
                        label={'Descripción de la actividad'}
                        iconClass={FontAwesome5}
                        iconName={'tasks'}
                        ref={(input) => { this.notesText = input; }}
                        iconColor={'#87d396'}
                        inputPadding={5}
                        labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}
                        onChangeText={text =>
                          this.setState({ notesText: text })
                        }
                        value={notesText}
                        maxLength={20}
                        useNativeDriver

                      />
                  
                    <View style={styles.seperator} />
                    <View>
                      <Text
                        style={styles.notes}>
                        Inicio
                      </Text>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={{
                          height: 30,
                          marginTop: 3,
                          flexDirection:'row'
                        }}
                      >
                        <FontAwesome5 name="clock" size={28} color="#87d396" 
                        style={{marginLeft:3}}
                        />
                        <Text style={{ marginLeft:9,fontSize: 19, fontFamily: 'Poppins_400Regular' }}>
                          {moment(alarmTime).format('h:mm A')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.seperator} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Text
                          style={styles.notes}>

                          Activar alarma
                        </Text>
                        <View
                          style={{
                            height: 30,
                            marginTop: 3,
                            flexDirection:'row'

                          }}
                        >
                           <FontAwesome5 name="bell" size={28} color="#87d396"
                             style={{marginLeft:3}}
                           />
                          <Text style={{ marginLeft:9,fontSize: 19, fontFamily: 'Poppins_400Regular'}}>
                            {moment(alarmTime).format('h:mm A')}
                          </Text>
                        </View>
                      </View>
                      <Switch
                        value={isAlarmSet}
                        onValueChange={this.handleAlarmSet}
                        color="#af42de"
                        
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={taskText === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        backgroundColor:
                          taskText === ''
                            ? '#b5d3bb'
                            : '#87d396',
                      },
                    ]}
                    onPress={async () => {
                      if (isAlarmSet) {
                        await this.synchronizeCalendar(value);
                      }
                      if (!isAlarmSet) {
                        this._handleCreateEventData(value);
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: "Poppins_400Regular"
                      }}
                    >
                      Agregar nueva actividad
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Context.Consumer>
    );
  }
}

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#d7dbdd',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#6cde84',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '600',
    fontFamily: 'Poppins_400Regular'

  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },

  title: {
    height: 25,
    fontFamily: 'Poppins_400Regular',

    fontSize: 19,
  },
  taskContainer: {
    height: 400,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 145,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
});