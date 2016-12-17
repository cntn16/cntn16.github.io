var app = angular.module("myApp",["ngRoute", "firebase"])
                .config(function($routeProvider){
                    $routeProvider
                        .when("/deadline",{
                            templateUrl: "templates/deadline.html",
                            controller: "deadlineController",
                            caseInsensitiveMatch: true
                        })
                        .otherwise({
                            redirectTo : "/deadline"
                        })
                })
                .controller("deadlineController", function($scope, $firebaseArray){
                    var ref = firebase.database().ref();
                    $scope.dataMonHoc = $firebaseArray(ref.child("monhoc"));
                    //
                    // Them mon hoc moi
                    $scope.addMonHoc = function(){
                        if ($scope.newTenMonHoc !="" && $scope.newMaMonHoc !="")
                            $scope.dataMonHoc.$add({
                                tenmonhoc : $scope.newTenMonHoc,
                                mamonhoc : $scope.newMaMonHoc
                            }).then(function(ref){
                                var id=ref.key;
                                 console.log("added record with id " + id);
                                 $scope.newTenMonHoc = "";
                                 $scope.newMaMonHoc = "";
                                // $scope.dataMonHoc.$indexFor(id);
                                alert("Them mon hoc thanh cong");
                            }).catch(function(err){
                                alert("Loi");
                                console.error(err);
                            })
                        else
                            alert("Gia tri khong duoc rong");
                    }
                    // Them Deadline
                    $scope.dataDeadline = $firebaseArray(ref.child("deadline"));
                    $scope.addDeadline = function(){
                        $scope.newDeadLine_HanNop = $("#newDeadLine_HanNop").val();
                        if ($scope.newDeadLine_TieuDe != null && $scope.newDeadLine_NoiDung != null && 
                                $scope.newDeadLine_IdMonHoc != "" && $scope.newDeadLine_LinkNop != null && 
                                $scope.newDeadLine_HanNop != null )
                        {
                            $scope.newDeadline = $firebaseArray(ref.child("deadline/"+$scope.newDeadLine_IdMonHoc));
                            $scope.newDeadline.$add({
                                hannop: $scope.newDeadLine_HanNop,
                                tieude : $scope.newDeadLine_TieuDe,
                                noidung: $scope.newDeadLine_NoiDung,
                                linknop: $scope.newDeadLine_LinkNop                                
                            }).then(function(ref){
                                alert("Them Deadline thanh cong");
                                //$scope.newDeadLine_HanNop = "";
                                 $("#newDeadLine_HanNop").val("");
                                $scope.newDeadLine_TieuDe = "";
                                $scope.newDeadLine_NoiDung = "";
                                $scope.newDeadLine_LinkNop = "";
                            }).catch(function(err){
                                alert("Loi");
                                console.log(err);
                            })
                        }
                        else alert("Khong duoc de gia tri trong");
                    }

                    /*$scope.data.$loaded()
                      .then(function() {
                        console.log($scope.data);
                      })
                      .catch(function(err) {
                        console.error(err);
                      });  */                
                })