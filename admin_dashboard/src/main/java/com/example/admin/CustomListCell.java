package com.example.admin;

import com.mongodb.client.*;
import com.mongodb.client.result.UpdateResult;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ListCell;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;

public class CustomListCell extends ListCell<String> {

    @Override
    protected void updateItem(String item, boolean empty) {
        super.updateItem(item, empty);

        if (empty || item == null) {
            setText(null);
            setGraphic(null);
        } else {
            String[] parts = item.split("\\|");

            String day = parts[0].trim();
            String timeSlotId = parts[1].trim();

            HBox hbox = new HBox();
            hbox.getChildren().addAll(new Button(day), new Button(timeSlotId));

            HBox buttonBox = new HBox();
            Button button1 = new Button("Approve");
            button1.setStyle("-fx-background-color: green");
            Button button2 = new Button("Reject");
            button2.setStyle("-fx-background-color: red");
            buttonBox.getChildren().addAll(button1, button2);

            button1.setOnAction(event -> {
                String newStatus = "approved";
                String uri = "mongodb+srv://irfansenell:ozan31cekenzi@cluster0.yvpet5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
                try (MongoClient mongoClient = MongoClients.create(uri)) {
                    MongoDatabase database = mongoClient.getDatabase("SAT_PROJE");
                    MongoCollection<Document> restaurantsCollection = database.getCollection("restaurants");

                    Document filter = new Document("id", "2");

                    FindIterable<Document> results = restaurantsCollection.find(filter);

                    for (Document result : results) {
                        List<ObjectId> reservationIds = result.getList("reservations", ObjectId.class);
                        for (ObjectId reservationId : reservationIds) {
                            MongoCollection<Document> reservationsCollection = database.getCollection("reservations");
                            Document reservationFilter = new Document("_id", reservationId)
                                    .append("day", day)
                                    .append("time_slot_id", timeSlotId);
                            Document reservation = reservationsCollection.find(reservationFilter).first();

                            if (reservation != null) {
                                Document update = new Document("$set", new Document("status", newStatus));
                                UpdateResult updateResult = reservationsCollection.updateOne(reservationFilter, update);
                                if (updateResult.getModifiedCount() > 0) {
                                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                                    alert.setTitle("Bilgilendirme");
                                    alert.setHeaderText(null);
                                    alert.setContentText("Rezervasyonun durumu güncellendi.");
                                    alert.showAndWait();
                                    System.out.println("Rezervasyonun durumu güncellendi.");
                                } else {
                                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                                    alert.setTitle("Bilgilendirme");
                                    alert.setHeaderText(null);
                                    alert.setContentText("Rezervasyonun durumu güncellendi.");
                                    alert.showAndWait();
                                    System.out.println("Rezervasyonun durumu güncellendi.");
                                }
                            }
                        }
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            });

            button2.setOnAction(event -> {
                String newStatus = "rejected";
                String uri = "mongodb+srv://irfansenell:ozan31cekenzi@cluster0.yvpet5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
                try (MongoClient mongoClient = MongoClients.create(uri)) {
                    MongoDatabase database = mongoClient.getDatabase("SAT_PROJE");
                    MongoCollection<Document> restaurantsCollection = database.getCollection("restaurants");

                    Document filter = new Document("id", "2");

                    FindIterable<Document> results = restaurantsCollection.find(filter);

                    for (Document result : results) {
                        List<ObjectId> reservationIds = result.getList("reservations", ObjectId.class);
                        for (ObjectId reservationId : reservationIds) {
                            MongoCollection<Document> reservationsCollection = database.getCollection("reservations");
                            Document reservationFilter = new Document("_id", reservationId)
                                    .append("day", day)
                                    .append("time_slot_id", timeSlotId);
                            Document reservation = reservationsCollection.find(reservationFilter).first();

                            if (reservation != null) {
                                Document update = new Document("$set", new Document("status", newStatus));
                                UpdateResult updateResult = reservationsCollection.updateOne(reservationFilter, update);
                                if (updateResult.getModifiedCount() > 0) {
                                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                                    alert.setTitle("Bilgilendirme");
                                    alert.setHeaderText(null);
                                    alert.setContentText("Rezervasyonun durumu güncellendi.");
                                    alert.showAndWait();
                                    System.out.println("Rezervasyonun durumu güncellendi.");
                                } else {
                                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                                    alert.setTitle("Bilgilendirme");
                                    alert.setHeaderText(null);
                                    alert.setContentText("Rezervasyonun durumu güncellendi.");
                                    alert.showAndWait();
                                    System.out.println("Rezervasyonun durumu güncellendi.");
                                }
                            }
                        }
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            });

            // HBox'lardaki tüm düğmeleri birleştir
            HBox allElementsBox = new HBox();
            allElementsBox.getChildren().addAll(hbox, buttonBox);

            // Hücreyi ayarla
            setGraphic(allElementsBox);

        }
    }
}
