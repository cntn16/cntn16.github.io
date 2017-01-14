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
                        if ($scope.newTenMonHoc !=null && $scope.newMaMonHoc !=null)
                            $scope.dataMonHoc.$add({
                                tenmonhoc : $scope.newTenMonHoc,
                                mamonhoc : $scope.newMaMonHoc
                            }).then(function(ref){
                                var id=ref.key;
                                 console.log("added record with id " + id);
                                 $scope.newTenMonHoc = "";
                                 $scope.newMaMonHoc = "";
                                // $scope.dataMonHoc.$indexFor(id);
                                //alert("Them mon hoc thanh cong");
                            }).catch(function(err){
                                alert("Loi");
                                console.error(err);
                            })
                        else
                            alert("Gia tri khong duoc rong");
                    }
                    $scope.delMonHoc = function(monhoc){
                        if (confirm("Chắc chưa ông nội?")) {
                            $scope.dataMonHoc.$remove(monhoc).then(function(ref){
                               // alert("Xoa mon hoc thanh cong");
                            }).catch(function(err){
                                    alert("Loi");
                                    console.error(err);
                                })
                        }
                    }
                    // Them Deadline
                    $scope.RefDeadline = ref.child("deadline")
                    $scope.dataDeadline = $firebaseArray(ref.child("deadline"))
                    
                    $scope.getFirebaseArray = function(refData, child){
                        return $scope.dataDeadline = $firebaseArray(refData.child(child));
                    }
                    $scope.delDeadline = function(data, child){
                        if (confirm("Chắc chưa ông nội?")) {
                            data.$remove(child).then(function(ref){
                               // alert("Xoa mon hoc thanh cong");
                            }).catch(function(err){
                                    alert("Loi");
                                    console.error(err);
                                })
                        }
                    }
                    $scope.addDeadline = function(){
                    	if ($scope.newTieudeDeadline != null && $scope.newNoiDungDeadline != null && $scope.newDeadLine_IdMonHoc != null
                    		&& $scope.newLinknopDeadline != null && $scope.newNgaynopDeadline != null && $scope.newGionopDeadline != null){
                    		newDeadline = $firebaseArray(ref.child("deadline/" + $scope.newDeadLine_IdMonHoc))
                    		newDeadline.$add({
                    			tieude : $scope.newTieudeDeadline,
                    			noidung: $scope.newNoiDungDeadline,
                    			linknop: $scope.newLinknopDeadline,
                    			gionop: $scope.newGionopDeadline,
                    			ngaynop: $scope.newNgaynopDeadline
                    		}).then(function(ref){
                                var id=ref.key;
                                 console.log("added record with id " + id);
                                 $scope.newTieudeDeadline = "";
                                 $scope.newNoiDungDeadline ="";
                                 $scope.newLinknopDeadline="";
                                 $scope.newNgaynopDeadline="";
                                 $scope.newGionopDeadline="";
                            }).catch(function(err){
                                alert("Loi");
                                console.error(err);
                            })
                        }
                        else
                            alert("Gia tri khong duoc rong");
                    	}
                    /*$scope.data.$loaded()
                      .then(function() {
                        console.log($scope.data);
                      })
                      .catch(function(err) {
                        console.error(err);
                      });  */                
                })