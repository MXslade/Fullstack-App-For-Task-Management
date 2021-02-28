package com.task.trello.services;

import com.task.trello.models.Card;
import com.task.trello.models.CardTask;

import java.util.List;

public interface CardService {

    // CRUD for Card
    Card addCard(Card card);

    List<Card> getAllCards();

    Card getCardById(Long id);

    Card editCard(Card card);

    Card deleteCardById(Long id);

    //CRUD for CardTask
    CardTask addCardTask(CardTask cardTask);

    List<CardTask> getAllCardTasks();

    CardTask getCardTaskById(Long id);

    CardTask editCardTask(CardTask cardTask);

    CardTask deleteCardTaskById(Long id);

    List<CardTask> getAllCardsTasksOfCard(Card card);

}
