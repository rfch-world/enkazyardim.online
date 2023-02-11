(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Murat Ekledi

const getTopCityList = () => {
  $("#city-list").empty();
  fetch("http://45.95.214.22:8282/sharing/topWreckList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status == 200) {
        response.json().then(text => {
          text = text.slice(0, 10);
          text.forEach(element => {
            var ul = document.getElementById("city-list");
            var li = document.createElement("li");
            li.classList.add("list-group-item");
            li.classList.add("gap-2");
            li.classList.add("d-flex");
            li.classList.add("justify-content-between");
            li.textContent = element.city + " ( " + element.number + " ) ";
            ul.appendChild(li);
            $("#city-list").append(li);
          });
        });
      } else {
        alert("Error");
      }
    })
    .catch(error => {
      console.log(error);
    });
};

getTopCityList();


//Fatih Ekledi

const getData = () => {
  var table = $("#adress-table").DataTable();
  table.clear().draw(false);
  fetch("http://45.95.214.22:8282/sharing/sharings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((text) => {
          text.forEach((element) => {
            table.row.add([
              element.city +
              "/" +
              element.district +
              "/" +
              element.neighbourhood +
              "/" +
              element.street,
              element.address,
              element.nameSurname,
              element.phoneNumber
            ]).draw(false);
          });
        });
      } else {
        alert("Error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

$("#register-button").click(function () {
  var username = $("#reg-username-field").val();
  var password = $("#reg-password-field").val();
  var ipAddress = "";
  var data = {
    username,
    password,
  };
  if (username == "" || password == "") {
    alert("Please fill all fields...!!!!!!");
  } else {
    fetch("http://45.95.214.22:8282/user/ip", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((text) => {
            ipAddress = text.data;
            data.ipAddress = ipAddress;
            fetch("http://45.95.214.22:8282/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((response) => {
              if (response.status == 200) {
                response.json().then((text) => {
                  console.log(text);
                  alert("Registration Successfull");
                  localStorage.setItem("token", text.accessToken);
                });
              } else {
                alert("Error");
              }
            });
          });
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

$("#login-button").click(function () {
  var username = $("#log-username-field").val();
  var password = $("#log-password-field").val();
  fetch("http://45.95.214.22:8282/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((text) => {
          alert("Login Successfull");
          if (localStorage.getItem("token") == null) {
            localStorage.setItem("token", text.accessToken);
          }
        });
      } else {
        alert("Error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

sehirler = [
  "Adana",
  "Adıyaman",
  "Afyon",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "İçel (Mersin)",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
];

$(document).ready(function () {
  localStorage.clear();
  $("#navbar-reg-btt").show();
  $("#navbar-log-btt").show();
  $("#navbar-out-btt").hide();
  getData();
  for (var i = 0; i < sehirler.length; i++) {
    var cities = document.getElementById("cities");
    var option = document.createElement("option");
    option.text = sehirler[i];
    option.value = sehirler[i];
    cities.appendChild(option);
  }
});

$("#submit-adress-btn").click((e) => {
  e.preventDefault();
  var address = $("#adress").val();
  var city = $("#cities").val();
  var district = $("#district").val();
  var neighbourhood = $("#neighbourhood").val();
  var street = $("#street").val();
  var nameSurname = $("#name-surname").val();
  var informationSource = $("#information-source").val();
  var phoneNumber = $("#phone-number").val();
  var data = {
    address,
    city,
    district,
    neighbourhood,
    street,
    nameSurname,
    informationSource,
    phoneNumber,
  };
  if (
    address == "" ||
    city == "" ||
    district == "" ||
    neighbourhood == "" ||
    street == "" ||
    nameSurname == "" ||
    informationSource == "" ||
    phoneNumber == "" ||
    $("#clarification-text").is(":checked") == false
  ) {
    alert("Please fill all fields...!!!!!!");
  } else {
    fetch("http://45.95.214.22:8181/api/verifyAdress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        city,
        neighbourhood,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((text) => {
            if (text.status == 200) {
              fetch("http://45.95.214.22:8282/sharing/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(data),
              }).then((response) => {
                if (response.status == 201) {
                  alert("Address added");
                } else {
                  alert("Error");
                }
              });
            } else {
              alert("Address not found");
            }
          });
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

$("#clear-all-btn").click(() => {
  $("#adress").val("");
  $("#cities").val("");
  $("#district").val("");
  $("#neighborhood").val("");
  $("#street").val("");
  $("#name-surname").val("");
  $("#information-source").val("");
  $("#phone-number").val("");
});

$("#navbar-out-btt").click(() => {
  localStorage.clear();
  $("#navbar-reg-btt").show();
  $("#navbar-log-btt").show();
  $("#navbar-out-btt").hide();
});

setInterval(function () {
  getData();
  getTopCityList()
}, 15000);

setInterval(function () {
  if (localStorage.getItem("token") == null) {
    $("#navbar-reg-btt").show();
    $("#navbar-log-btt").show();
    $("#navbar-out-btt").hide();
  } else {
    $("#navbar-reg-btt").hide();
    $("#navbar-log-btt").hide();
    $("#navbar-out-btt").show();
  }
}, 5000);
