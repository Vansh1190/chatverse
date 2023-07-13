import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function Card(props:any) {
  return (
    <IonCard>
      <img width={100} alt="Silhouette of mountains" src={props.img} />
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
        <IonCardSubtitle>{props.message}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}
export default Card;