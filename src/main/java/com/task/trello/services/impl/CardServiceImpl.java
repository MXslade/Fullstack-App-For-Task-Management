package com.task.trello.services.impl;

import com.task.trello.models.Card;
import com.task.trello.models.CardTask;
import com.task.trello.repositories.CardRepository;
import com.task.trello.repositories.CardTaskRepository;
import com.task.trello.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final CardTaskRepository cardTaskRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, CardTaskRepository cardTaskRepository) {
        this.cardRepository = cardRepository;
        this.cardTaskRepository = cardTaskRepository;
    }

    @Override
    public Card addCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Card getCardById(Long id) {
        return cardRepository.findById(id).orElse(null);
    }

    @Override
    public Card editCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public Card deleteCardById(Long id) {
        Card card = getCardById(id);
        if (card != null) {
            cardRepository.delete(card);
            return card;
        }
        return null;
    }

    @Override
    public List<Card> searchCardsByText(String text) {
        return cardRepository.findAllByNameContains(text);
    }

    @Override
    public CardTask addCardTask(CardTask cardTask) {
        return cardTaskRepository.save(cardTask);
    }

    @Override
    public List<CardTask> getAllCardTasks() {
        return cardTaskRepository.findAll();
    }

    @Override
    public CardTask getCardTaskById(Long id) {
        return cardTaskRepository.findById(id).orElse(null);
    }

    @Override
    public CardTask editCardTask(CardTask cardTask) {
        return cardTaskRepository.save(cardTask);
    }

    @Override
    public CardTask deleteCardTaskById(Long id) {
        CardTask cardTask = getCardTaskById(id);
        if (cardTask != null) {
            cardTaskRepository.delete(cardTask);
            return cardTask;
        }
        return null;
    }

    @Override
    public List<CardTask> getAllCardsTasksOfCard(Card card) {
        return cardTaskRepository.findAllByCard(card);
    }
}
