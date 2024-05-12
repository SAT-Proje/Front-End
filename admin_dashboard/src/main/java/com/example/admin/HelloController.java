
package com.example.admin;
import com.mongodb.MongoException;
import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.UpdateResult;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import org.bson.Document;

import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

public class HelloController {
    private Stage stage;
    private Scene scene;
    private Parent root;
    private List<Reservation> reservations;
    @FXML
    private TextField dayField;

    @FXML
    private TextField timeIdField;

    @FXML
    private TextField availabilityField;

    public void login(ActionEvent e) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/scene2.fxml"));
        Parent root = loader.load();

        Scene newScene = new Scene(root,300,480);
        Stage primaryStage = (Stage)((Node)e.getSource()).getScene().getWindow();
        newScene.getStylesheets().add(getClass().getResource("/pending.css").toExternalForm());
        primaryStage.setScene(newScene);
        primaryStage.show();
    }
    public void pendingButton(ActionEvent e) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/pendingRes.fxml"));
        Parent root = loader.load();

        ListView<String> reservationListView = (ListView<String>) root.lookup("#reservationListView");

        if (reservationListView == null) {
            System.out.println("ListView bulunamadı.");
            return;
        }
        reservationListView.setCellFactory(param -> new CustomListCell());
        ObservableList<String> items = FXCollections.observableArrayList();

        String uri = "mongodb+srv://irfansenell:ozan31cekenzi@cluster0.yvpet5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("SAT_PROJE");
            MongoCollection<Document> collection = database.getCollection("restaurants");

            Document filter = new Document("id", "2"); // Örnek bir _id

            FindIterable<Document> results = collection.find(filter);

            for (Document result : results) {
                List<ObjectId> reservationIds = result.getList("reservations", ObjectId.class);

                for (ObjectId reservationId : reservationIds) {
                    MongoCollection<Document> reservationsCollection = database.getCollection("reservations");
                    Document reservationFilter = new Document("_id", reservationId);
                    Document reservation = reservationsCollection.find(reservationFilter).first();

                    String day = reservation.getString("day");
                    String timeSlotId = reservation.getString("time_slot_id");

                    String reservationInfo =  day  + "|" + timeSlotId;
                    items.add(reservationInfo); // ListView'a öğe ekle
                }
            }
        } catch (MongoException er) {
            er.printStackTrace();
        }

        reservationListView.setItems(items);

        Scene newScene = new Scene(root, 300, 480);
        Stage primaryStage = (Stage) ((Node) e.getSource()).getScene().getWindow();
        newScene.getStylesheets().add(getClass().getResource("/list.css").toExternalForm());
        primaryStage.setScene(newScene);
        primaryStage.show();
    }
    public void goBack(ActionEvent e) throws IOException{
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/scene2.fxml"));
        Parent root = loader.load();
        Scene newScene = new Scene(root,300,480);
        Stage primaryStage = (Stage)((Node)e.getSource()).getScene().getWindow();
        newScene.getStylesheets().add(getClass().getResource("/pending.css").toExternalForm());
        primaryStage.setScene(newScene);
        primaryStage.show();
    }
}