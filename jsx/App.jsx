    ;<>
        <div id="auth-screen" className="screen active">
            <div className="auth-container">
                <h1 className="casino-title">🎲 [ПРИДУМАЙТЕ НАЗВАНИЕ]</h1>
                <div className="auth-tabs">
                    <button className="tab-btn active" onclick="showLogin()">
                        Вход
                    </button>
                    <button className="tab-btn" onclick="showSignup()">
                        Регистрация
                    </button>
                </div>
                <form id="login-form" className="auth-form active">
                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input type="text" placeholder="Введите имя" required="" />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            required=""
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Войти
                    </button>
                </form>
                <form id="signup-form" className="auth-form">
                    <div className="form-group">
                        <label>Имя пользователя</label>
                        <input
                            type="text"
                            placeholder="Придумайте имя"
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Введите email"
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label>Подтвердите пароль</label>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            required=""
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Создать аккаунт
                    </button>
                </form>
            </div>
        </div>
        <div id="game-screen" className="screen">
            <div className="game-container">
                <header className="game-header">
                    <div className="user-info">
                        <span className="username">Студент123</span>
                        <span className="balance">📊 [БАЛЛЫ] баллов</span>
                    </div>
                    <nav className="game-nav">
                        <button className="nav-btn" onclick="showLeaderboard()">
                            🏆 Рейтинг
                        </button>
                        <button className="nav-btn" onclick="logout()">
                            Выход
                        </button>
                    </nav>
                </header>
                <div className="slot-machine">
                    <div className="slot-machine-header">
                        <h2>🎲 [ПРИДУМАЙТЕ НАЗВАНИЕ ИГРЫ] 🎲</h2>
                    </div>
                    <div className="slots-container">
                        <div className="slot-wrapper">
                            <div className="slot" id="slot1">
                                <div className="reel">
                                    <div className="symbol">📚</div>
                                    <div className="symbol">✏️</div>
                                    <div className="symbol">🧠</div>
                                    <div className="symbol">🎓</div>
                                    <div className="symbol">🔥</div>
                                    <div className="symbol">💯</div>
                                    <div className="symbol">❌</div>
                                </div>
                            </div>
                        </div>
                        <div className="slot-wrapper">
                            <div className="slot" id="slot2">
                                <div className="reel">
                                    <div className="symbol">✏️</div>
                                    <div className="symbol">🧠</div>
                                    <div className="symbol">🎓</div>
                                    <div className="symbol">🔥</div>
                                    <div className="symbol">💯</div>
                                    <div className="symbol">❌</div>
                                    <div className="symbol">📚</div>
                                </div>
                            </div>
                        </div>
                        <div className="slot-wrapper">
                            <div className="slot" id="slot3">
                                <div className="reel">
                                    <div className="symbol">🧠</div>
                                    <div className="symbol">🎓</div>
                                    <div className="symbol">🔥</div>
                                    <div className="symbol">💯</div>
                                    <div className="symbol">❌</div>
                                    <div className="symbol">📚</div>
                                    <div className="symbol">✏️</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="win-message" id="win-message" />
                    <div className="bet-section">
                        <h3>Выберите ставку</h3>
                        <div className="bet-buttons">
                            <button
                                className="bet-btn active"
                                data-bet={10}
                                onclick="selectBet(10)">
                                <span className="bet-amount">10</span>
                                <span className="bet-label">баллов</span>
                            </button>
                            <button
                                className="bet-btn"
                                data-bet={50}
                                onclick="selectBet(50)">
                                <span className="bet-amount">50</span>
                                <span className="bet-label">баллов</span>
                            </button>
                            <button
                                className="bet-btn"
                                data-bet={100}
                                onclick="selectBet(100)">
                                <span className="bet-amount">100</span>
                                <span className="bet-label">баллов</span>
                            </button>
                        </div>
                    </div>
                    <button className="spin-btn" id="spin-btn" onclick="spin()">
                        <span className="spin-text">КРУТИТЬ</span>
                        <span className="spin-cost">Стоимость: 10 баллов</span>
                    </button>
                </div>
                <div className="payout-table">
                    <h3>Таблица выигрышей</h3>
                    <div className="payout-grid">
                        <div className="payout-item">
                            <span>💯 💯 💯</span>
                            <span className="multiplier">x100</span>
                        </div>
                        <div className="payout-item">
                            <span>🎓 🎓 🎓</span>
                            <span className="multiplier">x50</span>
                        </div>
                        <div className="payout-item">
                            <span>🔥 🔥 🔥</span>
                            <span className="multiplier">x25</span>
                        </div>
                        <div className="payout-item">
                            <span>🧠 🧠 🧠</span>
                            <span className="multiplier">x15</span>
                        </div>
                        <div className="payout-item">
                            <span>📚 📚 📚</span>
                            <span className="multiplier">x10</span>
                        </div>
                        <div className="payout-item">
                            <span>✏️ ✏️ ✏️</span>
                            <span className="multiplier">x8</span>
                        </div>
                        <div className="payout-item">
                            <span>❌ ❌ ❌</span>
                            <span className="multiplier">x0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="leaderboard-screen" className="screen">
            <div className="leaderboard-container">
                <button className="back-btn" onclick="backToGame()">
                    ← Назад к игре
                </button>
                <h1>🏆 Рейтинг лучших 🏆</h1>
                <div className="leaderboard-table">
                    <div className="leaderboard-header">
                        <span>Место</span>
                        <span>Студент</span>
                        <span>Баллы</span>
                    </div>
                    <div className="leaderboard-row rank-1">
                        <span className="rank">🥇 1</span>
                        <span className="player">Юзер</span>
                        <span className="score">15 750</span>
                    </div>
                    <div className="leaderboard-row rank-2">
                        <span className="rank">🥈 2</span>
                        <span className="player">Юзер</span>
                        <span className="score">12 340</span>
                    </div>
                    <div className="leaderboard-row rank-3">
                        <span className="rank">🥉 3</span>
                        <span className="player">Юзер</span>
                        <span className="score">9 880</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">4</span>
                        <span className="player">Юзер</span>
                        <span className="score">7 230</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">5</span>
                        <span className="player">Юзер</span>
                        <span className="score">6 450</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">6</span>
                        <span className="player">Юзер</span>
                        <span className="score">5 120</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">7</span>
                        <span className="player">Юзер</span>
                        <span className="score">4 890</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">8</span>
                        <span className="player">Юзер</span>
                        <span className="score">3 670</span>
                    </div>
                    <div className="leaderboard-row">
                        <span className="rank">9</span>
                        <span className="player">Юзер</span>
                        <span className="score">2 340</span>
                    </div>
                    <div className="leaderboard-row highlight">
                        <span className="rank">10</span>
                        <span className="player">Студент123 (Вы)</span>
                        <span className="score">1 000</span>
                    </div>
                </div>
            </div>
        </div>
    </>
