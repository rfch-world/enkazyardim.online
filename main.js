$(document).ready(function() {
  $("#example").DataTable();
});
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener(
      "submit",
      event => {
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
          var i = 0;
          text.forEach(element => {
            if (i == 7) return;
            var ul = document.getElementById("city-list");
            var li = document.createElement("li");
            li.classList.add("list-group-item");
            li.classList.add("gap-2");
            li.classList.add("d-flex");
            li.classList.add("justify-content-between");
            li.textContent = element.city + " ( " + element.number + " ) ";
            ul.appendChild(li);
            $("#city-list").append(li);
            i++;
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

//Fatih Ekledi
const getData = () => {
  $("#adress-table").empty();
  fetch("http://45.95.214.22:8282/sharing/sharings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status == 200) {
        response.json().then(text => {
          text.forEach(element => {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.textContent =
              element.city +
              "/" +
              element.district +
              "/" +
              element.neighbourhood +
              "/" +
              element.street;
            var td2 = document.createElement("td");
            td2.textContent = element.address;
            var td3 = document.createElement("td");
            td3.textContent = element.nameSurname;
            var td4 = document.createElement("td");
            td4.textContent = element.phoneNumber;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            $("#adress-table").append(tr);
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

$("#register-button").click(function() {
  var username = $("#reg-username-field").val();
  var password = $("#reg-password-field").val();
  var ipAddress = "";
  var data = {
    username,
    password
  };
  if (username == "" || password == "") {
    Swal.fire("L??tfen t??m alanlar?? doldurun", "", "warning");
  } else {
    fetch("http://45.95.214.22:8282/user/ip", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(text => {
            ipAddress = text.data;
            data.ipAddress = ipAddress;
            fetch("http://45.95.214.22:8282/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }).then(response => {
              if (response.status == 200) {
                response.json().then(text => {
                  console.log(text);
                  Swal.fire("Kay??t ba??ar??l??", "", "success");
                  localStorage.setItem("token", text.accessToken);
                });
              } else {
                Swal.fire("Bu isimli kullan??c?? zaten mevcut", "", "warning");
              }
            });
          });
        } else {
          Swal.fire("Hata olu??tu", "", "warning");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});

$("#login-button").click(function() {
  var username = $("#log-username-field").val();
  var password = $("#log-password-field").val();
  fetch("http://45.95.214.22:8282/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => {
      if (response.status == 200) {
        response.json().then(text => {
          Swal.fire("Giri?? ba??ar??l??", "", "success");
          if (localStorage.getItem("token") == null) {
            localStorage.setItem("token", text.accessToken);
          }
        });
      } else {
        Swal.fire("Kullan??c?? ad?? ve ya ??ifre yanl????", "", "warning");
      }
    })
    .catch(error => {
      console.log(error);
    });
});

sehirler = [
  "Adana",
  "Ad??yaman",
  "Afyon",
  "A??r??",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Ayd??n",
  "Bal??kesir",
  "Bilecik",
  "Bing??l",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "??anakkale",
  "??ank??r??",
  "??orum",
  "Denizli",
  "Diyarbak??r",
  "Edirne",
  "Elaz????",
  "Erzincan",
  "Erzurum",
  "Eski??ehir",
  "Gaziantep",
  "Giresun",
  "G??m????hane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "????el (Mersin)",
  "??stanbul",
  "??zmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "K??rklareli",
  "K??r??ehir",
  "Kocaeli",
  "Konya",
  "K??tahya",
  "Malatya",
  "Manisa",
  "Kahramanmara??",
  "Mardin",
  "Mu??la",
  "Mu??",
  "Nev??ehir",
  "Ni??de",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirda??",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "??anl??urfa",
  "U??ak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "K??r??kkale",
  "Batman",
  "????rnak",
  "Bart??n",
  "Ardahan",
  "I??d??r",
  "Yalova",
  "Karab??k",
  "Kilis",
  "Osmaniye",
  "D??zce"
];

$(document).ready(function() {
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

$("#submit-adress-btn").click(e => {
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
    phoneNumber
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
    Swal.fire("L??tfen t??m alanlar?? doldurun", "", "warning");
  } else {
    fetch("http://45.95.214.22:8181/api/verifyAdress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address,
        city,
        neighbourhood
      })
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(text => {
            if (text.status == 200) {
              fetch("http://45.95.214.22:8282/sharing/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(data)
              }).then(response => {
                if (response.status == 201) {
                  Swal.fire("??lan ba??ar??yla payla????ld??", "", "success").then(
                    result => {
                      location.reload();
                    }
                  );
                } else {
                  Swal.fire("??lan payla????l??rken hata olustu", "", "warning");
                }
              });
            } else {
              Swal.fire("Girilen adres yanl????", "", "warning");
            }
          });
        } else {
          Swal.fire("??lan payla????l??rken hata olu??tu", "", "warning");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});

$("#clear-all-btn").click(() => {
  $("#adress").val("");
  $("#cities").val("");
  $("#district").val("");
  $("#neighbourhood").val("");
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

getTopCityList();

setInterval(function() {
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
