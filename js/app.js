$(document).ready(function(){

  // Create Wine Manager Instance
  var wineManager = {
    wineUrl : 'https://myapi.profstream.com/api/9cb263/wines', // Wine URL
    showWines : function(){ // Display wines
      $.ajax({
        type : "GET",
        url : this.wineUrl,
        success : function(wines){
          $(".wine").remove();
          wines.forEach(function(wine){
            var source = $("#wine-template").html();
            var wineTemplate = Handlebars.compile(source);
            $(".wine-container").append(wineTemplate(wine));
          });
        },
        error : function () { alert("Error"); }

      });

    },
    addWine : function(){ // Add new wine
      var item = this;
      $.ajax({
        type : "POST",
        url : this.wineUrl,
        data : {
          name : $("#add-form #name").val(),
          year : $("#add-form #year").val(),
          grapes : $("#add-form #grapes").val(),
          country : $("#add-form #country").val(),
          region : $("#add-form #region").val(),
          description : $("#add-form #description").val(),
          picture : $("#add-form #picture").val(),
          price : $("#add-form #price").val()
        },
        success : function(wine){
          $('#add-wine-modal').modal('toggle');
           $('#add-form')[0].reset();
          item.showWines();
        },
        error : function () {
          alert("Error");
        }

      });

    },
    updateFormField : function(id){ // Update form fields
      $.ajax({
        type : "GET",
        url : this.wineUrl + "/" + id,
        success : function(wine){
          $(".modal-title").html("Edit " + wine.name);
          $("#edit-form #name").val(wine.name);
          $("#edit-form #year").val(wine.year);
          $("#edit-form #grapes").val(wine.grapes);
          $("#edit-form #country").val(wine.country);
          $("#edit-form #region").val(wine.region);
          $("#edit-form #description").val(wine.description);
          $("#edit-form #picture").val(wine.picture);
          $("#edit-form #price").val(wine.price);
          $("#edit-form").attr("data-id", wine.id);

        },
        error : function () {
          alert("Error");
        }

      });
    },
    updateWine : function(id){ // Update wine
      var item = this;
      $.ajax({
        type : "PUT",
        url : this.wineUrl + "/" + id,
        data : {
          name : $("#edit-form #name").val(),
          year : $("#edit-form #year").val(),
          grapes : $("#edit-form #grapes").val(),
          country : $("#edit-form #country").val(),
          region : $("#edit-form #region").val(),
          description : $("#edit-form #description").val(),
          picture : $("#edit-form #picture").val(),
          price : $("#edit-form #price").val()

        },
        success : function(wine){
          $('#edit-wine-modal').modal('hide');
          item.showWines();

        },
        error : function () {
          alert("Error");
        }
      });
    },
    deleteWine : function(id){ // Delete wine
      var item = this;
      $.ajax({
        type : "DELETE",
        url : this.wineUrl + "/" + id,
        success : function(wine){
          item.showWines();
        },
        error : function () {
          alert("Error");
        }

      });
    }
  };

  // Init wines
  wineManager.showWines();

  // Add new wine
  $("#add-form").on("submit", function(e){
    e.preventDefault();
    wineManager.addWine();
  });

  // Update Wine Fields & Open Modal
  $(document).on("click", ".edit", function(e){
    e.preventDefault();
    var id = parseInt($(this).attr("data-id"));
    wineManager.updateFormField(id);
  });

  // Edit existing wine & update
  $("#edit-form").on("submit", function(e){
    e.preventDefault();
    var id = parseInt($(this).attr("data-id"));
    wineManager.updateWine(id);

  });

  // Delete wine
  $(document).on("click", ".delete", function(e){
    var id = parseInt($(this).attr("data-id"));
    wineManager.deleteWine(id);
    e.preventDefault();
  });

});
