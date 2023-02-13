<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.2/css/dataTables.bootstrap5.min.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="style1.css?<?= time() ?>">
    <title>Enkaz</title>
</head>

<body>


    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Giriş yap</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="log-username-field" type="text" placeholder="İsim" class="form-control">
                    <input id="log-password-field" type="password" placeholder="Parola" class="my-2 form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                    <button id="login-button" type="button" class="btn btn-primary">Giriş yap</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Kayıt ol</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="reg-username-field" type="text" placeholder="İsim" class="form-control">
                    <input id="reg-password-field" type="password" placeholder="Parola" class="my-2 form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                    <button id="register-button" type="button" class="btn btn-primary">Kayıt ol</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tüm bilgiler silinecek</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Silmek istediğinizden eminmisiniz?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Hayır, silme</button>
                    <button type="button" id="clear-all-btn" class="btn btn-danger">Evet, sil</button>
                </div>
            </div>
        </div>
    </div>

    <nav class="navbar fixed-top bg-light  navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">Enkaz</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Enkaz Yardım</a>
                    </li>
                </ul>
                <div class="d-flex gap-2" role="search">
                    <button id="navbar-reg-btt" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#register">Kayıt ol</button>
                    <button id="navbar-log-btt" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#login" type="submit">Giriş Yap</button>
                    <button id="navbar-out-btt" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#login">Çıkış Yap</button>
                </div>
            </div>
        </div>
    </nav>
    <div class="pt-4 container form my-5">
        <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last gap-2 category">
                <ul class="list-group mb-3 ">
                    <li class="list-group-item">En fazla ilan bulunan şehirler</li>
                    <div id="city-list"></div>
                </ul>
            </div>
            <div class="col-md-12 col-lg-8">
                <h4 class="mb-3">Enkaz İlan</h4>
                <hr>
                <form class="needs-validation" novalidate="">
                    <div class="row g-3">
                        <div class="col-12 mb-3">
                            <select id="cities" class="form-select" required aria-label="select example">
                                <option value="">Şehir Seç</option>
                            </select>
                            <div class="invalid-feedback">Lütfen şehir seçiniz</div>
                        </div>

                        <div class="col-sm-6">
                            <label for="lastName" class="form-label">İlçe<span
                                    class="text-muted">(zorunlu)</span></label>
                            <input id="district" type="text" class="form-control"  placeholder="İlçe Giriniz" value=""
                                required="">
                            <div class="invalid-feedback">
                                Lütfen ilçe giriniz.
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="username" class="form-label">Bilgi Kaynağı <span
                                    class="text-muted">(zorunlu)</span></label>
                            <div class="input-group has-validation">
                                <select id="information-source" class="form-select" required aria-label="select example" required>
                                    <option value="">Bilgi Kaynağı Seç</option>
                                    <option value="Akrabası">Akrabası</option>
                                    <option value="Arkadaşı">Arkadaşı</option>
                                    <option value="Kendisi">Kendisi</option>
                                </select>
                                <div class="invalid-feedback">
                                    Lütfen bilgi kaynağı giriniz.
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="mahalle" class="form-label">Mahalle <span
                                    class="text-muted">(zorunlu)</span></label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="neighbourhood" placeholder="Mahelle Giriniz"
                                    required="">
                                <div class="invalid-feedback">
                                    Lütfen mahalle giriniz.
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="address" class="form-label">Sokak</label>
                            <input type="text" class="form-control" id="street" placeholder="Sümbül Sokak" required="">
                            <div class="invalid-feedback">
                                Lütfen sokak giriniz.
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="tel" class="form-label">İletişim <span
                                    class="text-muted">(zorunlu)</span></label>
                            <input type="tel" class="form-control" id="phone-number" required="" placeholder="0 555 555 55 55">
                            <div class="invalid-feedback">
                                Lütfen telefon numarası giriniz.
                            </div>
                        </div>



                        <div class="col-sm-6">
                            <label for="address2" class="form-label">İsim Soyisim <span
                                    class="text-muted">(Zorunlu)</span></label>
                            <input type="text" class="form-control" id="name-surname" required=""
                                placeholder="A. Yılmaz">
                                <div class="invalid-feedback">
                                    Lütfen isim soyisim giriniz.
                                </div>
                        </div>

                        <div class="col-12">
                            <label for="tarif" class="form-label">Adres Tarifi <span class="text-muted">(zorunlu
                                    değil)</span></label>
                            <input type="tel" class="form-control" id="adress" placeholder="Adresi anlatınız">
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="form-check">
                        <input id="clarification-text" type="checkbox" class="form-check-input" required="" id="same-address">
                        <label class="form-check-label" for="same-address"> Aydınlatma Metni'ni okudum ve kabul
                            ediyorum</label>
                    </div>

                    <p class="text-danger">
                        Enkaz, yıkım, yardım ve destek ihtiyaçları konusunda verdiğim bilgilerin doğru ve teyit edilmiş
                        olduğunu, bilgi kirliliği ve yanlış uygulamalara yol açmamak için gerekli tüm önlem ve
                        tedbirleri aldığımı, vermiş olduğum bilgilerde meydana gelen değişiklik ve güncellemeleri
                        bildireceğimi kabul ve beyan ederim.
                    </p>

                    <div class="gap-2 d-flex">
                        <button class="w-25 btn btn-danger btn-lg" type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal"><i class="bi bi-trash"></i> Sil</button>
                        <button id="submit-adress-btn" class="w-100 btn btn-primary btn-lg" type="submit"><i class="bi bi-send-fill"></i>
                            Gönder</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="my-5 container">
        <div class="row">
            <table id="adress-table" class="table table-striped" style="width:100%">
                <thead>
                    <tr>
                        <th>İl/İlçe/Mahalle/Sokak</th>
                        <th>Adres Detayı</th>
                        <th>Ad Soyad</th>
                        <th>İletişim</th>
                        <th>Bilgi Kaynağı</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

    </div>


    <footer class="enkaz-footer" >
        <p>
            <a href="https://github.com/rfch-world">Open Source</a>
        </p>
        <p><a href="https://rfch.world/">RFCH Takımı</a> ve <a href="https://github.com/orgs/rfch-world/people">gönüllü</a> arkadaşlarla geliştirildi.</p>
      </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
        integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.2/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="main.js?<?= time() ?>" ></script>
    <script>
        $(document).ready(function () {
            $('#example').DataTable();
        });

        $(document).ready(function () {
            $("#example tr.something").click(function () {
                alert("a");
            });
        });
    </script>
</body>

</html>
