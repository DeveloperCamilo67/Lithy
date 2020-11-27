import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Kohana } from 'react-native-textinput-effects';

import { Context } from '../../data/Context';
import TodoStore from '../../data/TodoStore';
import { Task } from '../../components/Task';



export default class Home extends Component {
  state = {
    datesWhitelist: [
      {
        start: moment(),
        end: moment().add(365, 'days'), // total 4 days enabled
      },
    ],
    todoList: [],
    markedDate: [],
    currentDate: `${moment().format('YYYY')}-${moment().format(
      'MM'
    )}-${moment().format('DD')}`,


    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  };

  async componentWillMount() {
    await this._handleDeletePreviousDayTask();
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }


  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };


  _handleDeletePreviousDayTask = async () => {
    const { currentDate } = this.state;
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format('YYYY')}-${moment().format(
          'MM'
        )}-${moment().format('DD')}`;
        const checkDate = moment(todayDate);
        await todoList.filter(item => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          if (checkedDate > 0) {
            item.todoList.forEach(async listValue => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {

              }
            });
            return false;
          }
          return true;
        });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this._updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _handleModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          this.setState({
            markedDate: markDot,
            
            todoList: todoLists[0].todoList,
            
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    prevSelectedTask.alarm.time = newModifiedDay;
    this.setState({
      selectedTask: prevSelectedTask,
    });

    this._hideDateTimePicker();
  };

  handleAlarmSet = () => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    this.setState({
      selectedTask: prevSelectedTask,
    });
  };

  _updateAlarm = async () => {
    const { selectedTask } = this.state;
    const calendarId = await this._createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask.alarm.time)
        .add(0, 'm')
        .toDate(),
      endDate: moment(selectedTask.alarm.time)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId.toString(),
          event
        );
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        this.setState({
          selectedTask: updateTask,
        });
      } catch (error) {

      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {

      }
    }
  };

  _deleteAlarm = async () => {
    const { selectedTask } = this.state;


    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      this.setState({
        selectedTask: updateTask,
      });
    } catch (error) {

    }
  };

  _getEvent = async () => {
    const { selectedTask } = this.state;

    if (selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
      }
    }
  };

  _findCalendars = async () => {
    const calendars = await Calendar.getCalendarsAsync();

    return calendars;
  };

  _createNewCalendar = async () => {
    const calendars = await this._findCalendars();
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#87d396',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default')
            .source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
            name: calendars.find(
              cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
            ).source.name,
            isLocalAccount: true,
          }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(
            cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
          ).ownerAccount
          : undefined,
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  render() {
    const {
      state: {
        datesWhitelist,
        markedDate,
        todoList,
        isModalVisible,
        selectedTask,
        isDateTimePickerVisible,
        currentDate,
      },
      props: { navigation },
    } = this;

    return (


      <Context.Consumer>
        {value => (
          <>
            {selectedTask !== null && (
              <Task isModalVisible={isModalVisible}>
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode="time"
                />
                <View style={styles.taskContainer}>



                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {

                          isModalVisible: false,
                        },
                      );
                    }}
                    style={{

                      left: 265,
                      bottom: 10,
                    }}
                  >
                    <FontAwesome5 name="times-circle" color="#ff4343" size={24} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#6cde84',
                      fontSize: 16,
                      fontWeight: '600',
                      marginLeft: 5,
                      fontFamily: 'Poppins_400Regular'
                    }}
                  >
                    Actvidad
                    </Text>

                  <Kohana
                    style={styles.title}
                    label={'Nombre de la actividad'}
                    iconClass={FontAwesome5}
                    iconName={'calendar-check'}

                    iconColor={'#87d396'}
                    inputPadding={5}
                    labelStyle={{ color: '#d7dbdd', fontFamily: "Poppins_300Light" }}
                    onChangeText={text => {
                      const prevSelectedTask = { ...selectedTask };
                      prevSelectedTask.title = text;
                      this.setState({
                        selectedTask: prevSelectedTask,
                      });
                    }}
                    value={selectedTask.title}
                    maxLength={20}
                    returnKeyType="next"

                    onSubmitEditing={() => { this.notesText.focus(); }}
                    useNativeDriver

                  />


                  <View style={styles.sepeerator} />
                  <Text
                    style={{
                      color: '#6cde84',
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: '600',
                      fontFamily: 'Poppins_400Regular'
                    }}
                  >
                    Descripción
                    </Text>
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
                    onChangeText={text => {
                      const prevSelectedTask = { ...selectedTask };
                      prevSelectedTask.notes = text;
                      this.setState({
                        selectedTask: prevSelectedTask,
                      });
                    }}
                    value={selectedTask.notes}
                    ref={(input) => { this.notesText = input; }}
                    maxLength={20}
                    useNativeDriver

                  />
                  <View style={styles.sepeerator} />
                  <View>
                    <Text
                      style={{
                        color: '#6cde84',
                        fontSize: 16,
                        fontWeight: '600',
                        fontFamily: 'Poppins_400Regular'
                      }}
                    >
                      Inicio
                    </Text>
                    <TouchableOpacity
                      onPress={() => this._showDateTimePicker()}
                      style={{
                        height: 30,
                        marginTop: 3,
                        flexDirection: 'row'
                      }}
                    >
                      <FontAwesome5 name="clock" size={28} color="#87d396"
                        style={{ marginLeft: 3 }}
                      />
                      <Text style={{ marginLeft: 9, fontSize: 19, fontFamily: 'Poppins_400Regular' }}>
                        {moment(selectedTask.alarm.time).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sepeerator} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',

                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: '#6cde84',
                          fontSize: 16,

                          fontFamily: 'Poppins_400Regular'
                        }}
                      >
                        Activar alarma
                      </Text>
                      <View
                        style={{
                          height: 30,
                          marginTop: 3,
                          flexDirection: 'row'
                        }}
                      >
                        <FontAwesome5 name="bell" size={28} color="#87d396"
                          style={{ marginLeft: 3 }}
                        />
                        <Text style={{ marginLeft: 9, fontSize: 19, fontFamily: 'Poppins_400Regular' }}>
                          {moment(selectedTask.alarm.time).format('h:mm A')}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={selectedTask.alarm.isOn}
                      onValueChange={this.handleAlarmSet}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                 disabled={selectedTask.title === ''}
                 style={[
                  styles.updateButton,
                   {
                     backgroundColor:
                       selectedTask.title === ''
                         ? '#b5d3bb'
                         : '#87d396',
                         
                       
                   },
                 ]}

                      onPress={async () => {
                        this._handleModalVisible();
                        if (selectedTask.alarm.isOn) {
                          await this._updateAlarm();
                        } else {
                          await this._deleteAlarm();
                        }
                        await value.updateSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                     
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                          fontFamily: 'Poppins_400Regular'

                        }}
                      >
                        <FontAwesome5 name="edit" size={20} />

                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        this._handleModalVisible();
                        this._deleteAlarm();
                        await value.deleteSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                      style={styles.deleteButton}
                    >

                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                          fontFamily: 'Poppins_400Regular'
                        }}
                      >
                        <FontAwesome5 name="trash" size={15} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Task>
            )}
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF'
              }}
            >

              <CalendarStrip
                ref={ref => {
                  this.calenderRef = ref;
                }}
                calendarAnimation={{ type: 'sequence', duration: 800 }}
                daySelectionAnimation={{
                  type: 'background',
                  duration: 800,
                  highlightColor: '#ffffff',
                }}
                style={{
                  height: 150,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                
                calendarHeaderStyle={{ color: '#000000' }}
                dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
                dateNameStyle={{ color: '#BBBBBB' }}
                highlightDateNumberStyle={{
                  color: '#fff',
                  backgroundColor: '#87d396',
                  marginTop: 10,
                  height: 35,
                  width: 35,
                  textAlign: 'center',
                  borderRadius: 17.5,
                  overflow: 'hidden',
                  paddingTop: 6,
                  fontWeight: '400',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
               
                highlightDateNameStyle={{ color: '#87d396' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
                datesWhitelist={datesWhitelist}
                iconLeft={require('../../assets/left-arrow.png')}
                iconRight={require('../../assets/right-arrow.png')}
                iconContainer={{ flex: 0.1 }}
                markedDates={markedDate}
                calendarHeaderStyle={{textTransform:'capitalize'}}
                onDateSelected={date => {
                  const selectedDate = `${moment(date).format('YYYY')}-${moment(
                    date
                  ).format('MM')}-${moment(date).format('DD')}`;
                  this._updateCurrentTask(selectedDate);
                  this.setState({
                    currentDate: selectedDate,
                  });
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('nuevoRutina', {
                    updateCurrentTask: this._updateCurrentTask,
                    currentDate,
                    createNewCalendar: this._createNewCalendar,
                  })
                }
                style={styles.viewTask}
              >
                <Image
                  source={require('../../assets/plus.png')}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 120,

                }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 120,
                  }}
                >
                  {todoList.map(item => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState(
                          {
                            selectedTask: item,
                            isModalVisible: true,
                          },
                          () => {
                            this._getEvent();
                          }
                        );
                      }}
                      key={item.key}
                      style={styles.taskListContent}
                    >
                      <View
                        style={{
                          marginLeft: 13,

                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                          }}
                        >
                          <View
                            style={{

                              borderRadius: 6,

                              marginRight: 8,
                            }}>

                            <FontAwesome5 name="calendar-check" style={{ color: item.color, }} size={14} />
                          </View>
                          <Text
                            style={{
                              color: '#554A4C',
                              fontSize: 20,
                              fontFamily: 'Poppins_600SemiBold'
                            }}
                          >
                            {item.title}
                          </Text>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <FontAwesome5 name="calendar-day" style={{ color: item.color, }} size={14} />
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: '#817f80',
                                fontSize: 14,
                                paddingLeft: 1,
                                fontFamily: 'Poppins_400Regular_Italic'
                              }}
                            >{`${moment(item.alarm.time).format(
                              'YYYY'
                            )}/${moment(item.alarm.time).format('MM')}/${moment(
                              item.alarm.time
                            ).format('DD')}`}</Text>
                            <FontAwesome5 name="clock" style={{ color: item.color, marginLeft: 15 }} size={14} />
                            <Text
                              style={{
                                color: '#817f80',
                                fontSize: 14,
                                paddingLeft: 1,
                                fontFamily: 'Poppins_400Regular_Italic'
                              }}
                            > {moment(item.alarm.time).format('h:mm A')}</Text>

                          </View>


                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <FontAwesome5 name="tasks" style={{ color: item.color, }} size={14} />
                          <Text
                            style={{
                              color: '#817f80',
                              fontSize: 14,
                              marginLeft: 10,
                              fontFamily: 'Poppins_500Medium'
                            }}
                          >

                            {item.notes}
                          </Text>
                        </View>

                      </View>
                      <View
                        style={{
                          height: 80,
                          width: 12,
                          backgroundColor: item.color,
                          borderRadius: 5,
                          right: 2
                        }}>

                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Context.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#87d396',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTask: {

    bottom: 140,
    left: 300,
    height: 30,
    width: 30,
    backgroundColor: '#87d396',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#87d396',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: '#ff4343',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
   
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
  sepeerator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 10,
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,

    fontSize: 19,
    fontFamily: 'Poppins_400Regular'
  },
  taskContainer: {
    height: 475,
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
  container: {
    backgroundColor: '#FFF'
  }
});