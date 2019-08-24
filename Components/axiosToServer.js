export default login = () => {
  // alert(this.state.username);
  const ServerURL = 'http://13.125.177.75:3000/api/user/login';

  var body = {
    email: this.state.email,
    password: this.state.password,
  };

  const Config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  };

  const encodeForm = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join('&');
  };
  axios
    .post(ServerURL, encodeForm(body), {
      headers: {
        Accept: 'application/json',
      },
    })
    .then(json => {
      // alert('body: ' + JSON.stringify(body));
      // alert('json: ' + JSON.stringify(json.data));
      //alert('phone : ' + JSON.stringify(json.data.phone)  );
      if (JSON.stringify(json.data.success) === 'true') {
        AsyncStorage.setItem('user', JSON.stringify(json.data));
        this.props.navigation.navigate('SignUp');
      } else {
        alert('Please have check Email and Password to correctly');
      }
    }) // End of Then
    .catch(error => {
      alert('Occured Error that reason is [ : ' + error + ' ]');
    })
    .done();
}; //End of Login Function

