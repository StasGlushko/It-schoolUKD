import { useState } from 'react'
import s from './CommentsSection.module.scss'
import { FaUser, FaThumbsUp, FaPaperPlane } from 'react-icons/fa'

const initialComments = [
	{
		id: 1,
		author: 'Марія К.',
		date: '15.04.2023',
		text: 'Мій син відвідує курси програмування вже другий рік. Дуже задоволені результатами! Викладачі чудово пояснюють складні теми простою мовою.',
		likes: 12,
	},
	{
		id: 2,
		author: 'Олександр П.',
		date: '03.03.2023',
		text: 'Дуже вдячний школі за курс робототехніки. Нарешті зміг створити свого першого робота, який виконує прості команди. Рекомендую всім, хто цікавиться технологіями!',
		likes: 8,
	},
	{
		id: 3,
		author: 'Анна В.',
		date: '22.02.2023',
		text: 'Моя донька відвідує курс мобільної фотографії. Їй дуже подобається! Викладачі професійні та уважні до кожного учня. Особливо цінуємо індивідуальний підхід.',
		likes: 15,
	},
]

export function CommentsSection() {
	const [comments, setComments] = useState(initialComments)
	const [newComment, setNewComment] = useState('')
	const [name, setName] = useState('')

	const handleAddComment = () => {
		if (newComment.trim() === '' || name.trim() === '') return

		const currentDate = new Date()
		const formattedDate = `${currentDate
			.getDate()
			.toString()
			.padStart(2, '0')}.${(currentDate.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${currentDate.getFullYear()}`

		const newCommentObj = {
			id: comments.length + 1,
			author: name,
			date: formattedDate,
			text: newComment,
			likes: 0,
		}

		setComments([...comments, newCommentObj])
		setNewComment('')
		setName('')
	}

	const handleLike = (id: number) => {
		setComments(
			comments.map(comment =>
				comment.id === id
					? { ...comment, likes: comment.likes + 1 }
					: comment,
			),
		)
	}

	return (
		<div className={s.commentSection}>
			<div className={s.commentsList}>
				{comments.map(comment => (
					<div key={comment.id} className={s.commentCard}>
						<div className={s.commentHeader}>
							<div className={s.commentAuthor}>
								<div className={s.avatarWrapper}>
									<FaUser className={s.avatarIcon} />
								</div>
								<div>
									<h4 className={s.authorName}>{comment.author}</h4>
									<span className={s.commentDate}>{comment.date}</span>
								</div>
							</div>
							<button
								className={s.likeButton}
								onClick={() => handleLike(comment.id)}>
								<FaThumbsUp className={s.likeIcon} />
								<span>{comment.likes}</span>
							</button>
						</div>
						<p className={s.commentText}>{comment.text}</p>
					</div>
				))}
			</div>

			<div className={s.addCommentForm}>
				<h3 className={s.formTitle}>Залишити відгук</h3>
				<div className={s.formGroup}>
					<label htmlFor='name' className={s.formLabel}>
						Ваше ім'я
					</label>
					<input
						type='text'
						id='name'
						className={s.formInput}
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Введіть ваше ім'я"
					/>
				</div>
				<div className={s.formGroup}>
					<label htmlFor='comment' className={s.formLabel}>
						Ваш відгук
					</label>
					<textarea
						id='comment'
						className={s.formTextarea}
						value={newComment}
						onChange={e => setNewComment(e.target.value)}
						placeholder='Поділіться вашими враженнями про школу'
						rows={4}></textarea>
				</div>
				<button className={s.submitButton} onClick={handleAddComment}>
					<FaPaperPlane className={s.submitIcon} />
					Надіслати відгук
				</button>
			</div>
		</div>
	)
}
