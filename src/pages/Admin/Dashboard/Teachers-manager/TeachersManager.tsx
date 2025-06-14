import type React from "react"
import { useState, useEffect } from "react"
import s from "./TeachersManager.module.scss"

interface Teacher {
  id: number
  firstName: string
  lastName: string
  description: string
  imageUrl: string
}

export const TeachersManager = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    imageUrl: "",
  })

  // Симуляція завантаження даних
  useEffect(() => {
    const mockTeachers: Teacher[] = [
      {
        id: 1,
        firstName: "Саня",
        lastName: "Строїч",
        description: "пан староста",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        firstName: "Олена",
        lastName: "Петренко",
        description: "Експерт з React та Frontend розробки",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ]
    setTeachers(mockTeachers)
  }, [])

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      description: "",
      imageUrl: "",
    })
    setEditingTeacher(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((teacher) => (teacher.id === editingTeacher.id ? { ...formData, id: editingTeacher.id } : teacher)),
      )
    } else {
      const newTeacher: Teacher = {
        ...formData,
        id: Date.now(),
      }
      setTeachers((prev) => [...prev, newTeacher])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      description: teacher.description,
      imageUrl: teacher.imageUrl,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цього викладача?")) {
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id))
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase()
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div>
          <h2 className={s.title}>Управління викладачами</h2>
          <p className={s.description}>Створюйте, редагуйте та видаляйте викладачів</p>
        </div>
        <button
          className={s.addBtn}
          onClick={() => {
            resetForm()
            setIsDialogOpen(true)
          }}
        >
          <svg className={s.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Додати викладача
        </button>
      </div>

      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Ім'я</th>
              <th>Прізвище</th>
              <th>Опис</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>
                  <div className={s.avatar}>
                    {teacher.imageUrl ? (
                      <img
                        src={teacher.imageUrl || "/placeholder.svg"}
                        alt={`${teacher.firstName} ${teacher.lastName}`}
                        className={s.avatarImage}
                      />
                    ) : (
                      <div className={s.avatarFallback}>{getInitials(teacher.firstName, teacher.lastName)}</div>
                    )}
                  </div>
                </td>
                <td className={s.nameCell}>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.description}</td>
                <td>
                  <div className={s.actions}>
                    <button className={s.editBtn} onClick={() => handleEdit(teacher)}>
                      <svg className={s.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className={s.deleteBtn} onClick={() => handleDelete(teacher.id)}>
                      <svg className={s.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div className={s.modal}>
          <div className={s.modalOverlay} onClick={() => setIsDialogOpen(false)} />
          <div className={s.modalContent}>
            <div className={s.modalHeader}>
              <h3 className={s.modalTitle}>
                {editingTeacher ? "Редагувати викладача" : "Створити нового викладача"}
              </h3>
              <button className={s.closeBtn} onClick={() => setIsDialogOpen(false)}>
                <svg className={s.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label className={s.label}>Ім'я</label>
                  <input
                    type="text"
                    className={s.input}
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Прізвище</label>
                  <input
                    type="text"
                    className={s.input}
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>Опис</label>
                <textarea
                  className={s.textarea}
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className={s.field}>
                <label className={s.label}>URL фото</label>
                <input
                  type="url"
                  className={s.input}
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className={s.formActions}>
                <button type="button" className={s.cancelBtn} onClick={() => setIsDialogOpen(false)}>
                  Скасувати
                </button>
                <button type="submit" className={s.submitBtn}>
                  {editingTeacher ? "Зберегти зміни" : "Створити викладача"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
