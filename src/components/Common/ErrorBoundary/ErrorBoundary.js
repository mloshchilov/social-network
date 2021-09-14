import React from 'react';


export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Обновить состояние, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Вывод информации об ошибке в консоль
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Можно отрендерить запасной UI произвольного вида
        return <h1>Упс... Что-то пошло не так, попробуйте перезагрузить страницу позже.</h1>;
      }
  
      return this.props.children; 
    }
}